FROM node:alpine

WORKDIR ./

COPY package.json .

RUN npm install --only=prod

RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]