# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Expose port for Next.js dev server
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
