# Use the official Node.js image.
FROM node:16-alpine

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of your application code.
COPY . .

# Build the application.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 3000

# Run the application.
CMD ["npm", "run","start:dev"]
