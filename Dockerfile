FROM node:8.1.4

WORKDIR /jsval
COPY package.json package-lock.json ./
RUN npm install
COPY . .

CMD npm run lint && npm run build && npm test
