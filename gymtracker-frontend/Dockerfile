# GymTracker Frontend - production image

# --- Build stage --------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

# --- Runtime stage ------------------------------------------------------
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx assets
RUN rm -rf ./*

# Copy built static files
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Default nginx startup
CMD ["nginx", "-g", "daemon off;"]
