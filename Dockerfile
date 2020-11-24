# DEVELOPMENT DOCKERFILE
# docker build -t resta1 .
# docker run -it -p 3000:3000 -v /app/node_modules -v ${pwd}:/app resta1
# npm start
# npm run-script build

# Base image
FROM node:slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY ./package.json ./
RUN npm install

# Run command shell
CMD ["bash"]