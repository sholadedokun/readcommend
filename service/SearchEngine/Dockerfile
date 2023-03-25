FROM node:16

WORKDIR /SearchEngine
COPY package.json .
RUN npm install
RUN npm ci --only=production
# Build node app
COPY . .

EXPOSE 5001

CMD ["npm", "start"]
