#building an image of this auth ms
FROM node:alpine

WORKDIR ./
COPY package.json .
RUN npm install --only=prod
COPY . .

EXPOSE 5000

CMD ["npm", "start"]