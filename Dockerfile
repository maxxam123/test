# Requires node:18-alpine as the base image for Dockerizing the Node.js application
FROM node:alpine
# It installs the nodemon package for monitoring the Express server
RUN npm install -g nodemon
# Creating the working directory
WORKDIR /app
# Copying the dependencies in the package.json file
COPY package.json .
#Installing all the dependencies
RUN npm install
RUN npm install cors
RUN npm install express
#Copying all the files to the working directory
COPY . .
#Container will run on this port
EXPOSE 8800
#Command to start the Docker container Node.js application
CMD ["npm", "start"]