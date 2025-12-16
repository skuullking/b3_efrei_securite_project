const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class JWTService {
  // Service JWT centralisé : stocke la configuration sensible et bornes de validité
  // Les secrets et le coût de bcrypt (saltRounds) proviennent des variables d'environnement
  // afin d'éviter le hardcode et faciliter les évolutions de sécurité.
  constructor() {
    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
    this.accessTokenExpiry = "15m";
    this.refreshTokenExpiry = "7d";
    this.bcryptSaltRounds = parseInt(
      process.env.BCRYPT_SALT_ROUNDS || "12",
      10
    );
    this.bcryptPepper = process.env.BCRYPT_PEPPER || "";
  }

  generateAccessToken(payload) {
    if (!this.accessTokenSecret) {
      throw new Error("JWT_ACCESS_SECRET non configuré");
    }
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
      issuer: "fitness-api",
      audience: "fitness-app",
    });
  }

  generateRefreshToken(payload) {
    if (!this.refreshTokenSecret) {
      throw new Error("JWT_REFRESH_SECRET non configuré");
    }
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiry,
      issuer: "fitness-api",
      audience: "fitness-app",
    });
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.accessTokenSecret);
    } catch (error) {
      throw new Error("Token d'accès invalide");
    }
  }

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.refreshTokenSecret);
    } catch (error) {
      throw new Error("Refresh token invalide");
    }
  }

  // Hachage sécurisé du mot de passe :
  // - bcrypt avec un coût configuré (salt rounds),
  // - pepper optionnel concaténé avant le hachage si défini dans l'ENV.
  // Le pepper empêche la réutilisation d'un hash s'il est exfiltré sans l'ENV.
  async hashPassword(password) {
    const material = this.bcryptPepper
      ? `${password}${this.bcryptPepper}`
      : password;
    return await bcrypt.hash(material, this.bcryptSaltRounds);
  }

  // Vérification du mot de passe : on reconstruit la même "matière" que lors du hash
  // (password + pepper éventuel) puis on compare avec bcrypt de manière sécurisée.
  async comparePassword(password, hashedPassword) {
    const material = this.bcryptPepper
      ? `${password}${this.bcryptPepper}`
      : password;
    return await bcrypt.compare(material, hashedPassword);
  }

  // Compatibilité ascendante et durcissement :
  // 1) On tente d'abord avec pepper si présent.
  // 2) Si échec, on retente SANS pepper pour supporter d'anciens hashes (legacy).
  //    En cas de succès legacy, on signale needsRehash=true pour ré-hacher à la volée
  //    et ainsi migrer progressivement tous les comptes sans bloquer l'utilisateur.
  async verifyPasswordAndDetectLegacy(password, hashedPassword) {
    // Try compare with pepper first
    if (this.bcryptPepper) {
      const withPepper = await bcrypt.compare(
        `${password}${this.bcryptPepper}`,
        hashedPassword
      );
      if (withPepper) {
        return { valid: true, needsRehash: false };
      }
      // Fallback: legacy hashes without pepper
      const legacyOk = await bcrypt.compare(password, hashedPassword);
      if (legacyOk) {
        return { valid: true, needsRehash: true };
      }
      return { valid: false, needsRehash: false };
    }
    // No pepper configured: simple compare
    const ok = await bcrypt.compare(password, hashedPassword);
    return { valid: ok, needsRehash: false };
  }

  extractTokenFromHeader(authHeader) {
    if (!authHeader) {
      throw new Error("Header Authorization manquant");
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new Error("Format Authorization header invalide");
    }

    return parts[1];
  }

  // Rotation des tokens : vérifie le refresh token puis émet une nouvelle paire
  // (access + refresh) afin de limiter la fenêtre d'exploitation en cas de fuite.
  refreshTokens(refreshToken) {
    const decoded = this.verifyRefreshToken(refreshToken);

    const userPayload = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    const newAccessToken = this.generateAccessToken(userPayload);
    const newRefreshToken = this.generateRefreshToken(userPayload);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: userPayload,
    };
  }
}

module.exports = new JWTService();
