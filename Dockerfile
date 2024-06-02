# Use the official Node.js image.
FROM node:22

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install
RUN npm install -g nodemon

# Copy the rest of the application.
COPY . .

# Expose port 2828.
EXPOSE 2828

# Start the Express app with nodemon.
CMD ["nodemon", "index.js"]
