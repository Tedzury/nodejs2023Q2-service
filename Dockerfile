FROM node:20-alpine

RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

COPY package*.json ./

USER root

RUN chown -R app:app .

RUN chmod -R 777 .

USER app

RUN npm install

COPY . . 

RUN npx prisma generate

EXPOSE ${PORT} 

CMD npm run start:dev:migrate
