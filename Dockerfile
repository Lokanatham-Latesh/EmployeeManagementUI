# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Serve the build files using a lightweight server
RUN npm install -g serve

# Set the command to run the server
CMD ["serve", "-s", "dist", "-l", "5173"]

# Expose the application port
EXPOSE 5173
