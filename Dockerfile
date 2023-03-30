FROM node:18-alpine

RUN mkdir /app
WORKDIR /app/
COPY ["package.json", "package-lock.json", "/app/"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]