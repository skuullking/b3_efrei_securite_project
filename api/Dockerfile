# GymFit API - Dockerfile
# Build a production image for the Node.js/Express backend

FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Copy Docker-specific environment file as .env
COPY .env.docker .env

# Expose API port
EXPOSE 3000

# Start the API
CMD ["npm", "start"]
