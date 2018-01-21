FROM node

WORKDIR /home/node
COPY . .
RUN chown -R node:node .

USER node
RUN npm install && npm run test:all

ENV NODE_ENV=production
ENTRYPOINT node src/index.js --verbose
