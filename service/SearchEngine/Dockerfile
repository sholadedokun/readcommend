FROM node:10.18.1

WORKDIR /SearchEngine
COPY package.json .
RUN npm install

# Build node app
COPY . .
RUN npm start

CMD ["npm", "start"]
