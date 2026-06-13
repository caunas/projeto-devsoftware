# ======================
# npm version: 10.9.8
# node version: 22.22.3
# ======================

ARG NODE_VERSION=22.22.3

FROM node:${NODE_VERSION} AS dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
