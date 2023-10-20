FROM node:16-alpine

WORKDIR /app
COPY package.json .
COPY prisma ./prisma/
COPY .env ./
RUN npm install --only=prod
COPY . ./

EXPOSE 3000

CMD ["npm", "start"]