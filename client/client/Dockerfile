FROM node:18-alpine as builder
WORKDIR /app

# RUN npm install -g npm
# RUN npm remove node_modules 
# RUN npm remove package-lock.json
# RUN npm cache clean --force
EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
# Start the app
CMD [ "npm", "start" ]