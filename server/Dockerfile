FROM node:18-alpine
WORKDIR /backend-docker-example/

ENV PORT=5000
ENV JWT_SECRET=abc123

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]