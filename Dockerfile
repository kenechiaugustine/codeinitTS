FROM node:alpine

WORKDIR ./

COPY package.json .

RUN npm install

RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]