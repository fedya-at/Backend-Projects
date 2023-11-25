# Use the official Node.js image as the base image for building the app
FROM node:latest as build

# Set the working directory in the image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite app
RUN npm run build

# Use a smaller, production-ready image for serving the app
FROM nginx:latest

# Copy the built app from the previous stage to the nginx public directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the port that Nginx will run on
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
