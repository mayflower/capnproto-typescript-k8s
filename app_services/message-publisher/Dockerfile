FROM node:14.17.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -l

EXPOSE 3001

CMD ["npm", "run", "start"]
