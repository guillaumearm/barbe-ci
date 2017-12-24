const createRouter = require('koa-router');
const api = require('../api');

const router = createRouter();
router.post('/api', api);
router.get('/api', (ctx) => {
  ctx.body = "OK"
})

module.exports = router;
