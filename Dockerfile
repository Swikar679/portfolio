# Use Node.js 20-slim as the base image
FROM node:20-slim AS builder

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including devDependencies for building)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (client and server)
RUN npm run build

# Stage 2: Runtime
FROM node:20-slim

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy the build output and necessary files from the builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Create an uploads directory if it doesn't exist
RUN mkdir -p uploads

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
