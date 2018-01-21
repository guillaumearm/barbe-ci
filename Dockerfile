FROM node

USER node
WORKDIR /home/node

COPY . .
RUN npm install && npm run test:all

ENV NODE_ENV=production
ENTRYPOINT node src/index.js --verbose
