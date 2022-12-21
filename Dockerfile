FROM node:14.21.2-alpine

WORKDIR /app

ENV PORT 5000

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "start"]