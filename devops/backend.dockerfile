FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

ENV NODE_PATH .

CMD [ "node", "index.js" ]