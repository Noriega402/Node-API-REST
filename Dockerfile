FROM node:18.15.0

COPY ["package.json", "package-lock.json", "/app"]

WORKDIR /app

RUN npm install

COPY [".","."]

EXPOSE 3000

CMD ["npm", "start"]