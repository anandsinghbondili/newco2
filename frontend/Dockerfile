# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose port for Next.js production server
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
