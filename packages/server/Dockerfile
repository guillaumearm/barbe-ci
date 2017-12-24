FROM node

USER node
WORKDIR /home/node

COPY . .
RUN npm install && npm test

ENV NODE_ENV=production
ENTRYPOINT node src/index.js --verbose
