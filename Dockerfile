FROM node:16-alpine

WORKDIR /app
COPY package.json .
COPY prisma ./prisma/
COPY .env ./
RUN npm install --only=prod
COPY . ./
RUN npx prisma generate
EXPOSE 3000

CMD ["npm", "start"]