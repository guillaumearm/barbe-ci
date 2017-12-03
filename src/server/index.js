/* eslint-disable no-console */

import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = path.resolve(__dirname, '../../dist')

const app = new Koa();

app.use(serve(DIST_FOLDER))
app.listen(PORT)

console.log(`Listening on ${PORT}...`);
console.log(`Serving files over ${DIST_FOLDER}`);
