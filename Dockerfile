# ---- Build stage ----
FROM node:18-alpine AS build
WORKDIR /app
    
# Install dependencies (cached layer)
COPY package*.json ./
RUN npm ci
    
# Copy rest and build
COPY . .
RUN npm run build
    
# ---- Runtime stage ----
FROM node:18-alpine AS runtime
WORKDIR /app
    
# Install a small static server
RUN npm install -g serve
    
# Copy built assets
COPY --from=build /app/dist ./dist
    
# Optional: run as non-root user for better security
RUN addgroup -S app && adduser -S app -G app
USER app
    
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
    