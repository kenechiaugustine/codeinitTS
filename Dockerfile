FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 4001

CMD ["npm", "start"]
