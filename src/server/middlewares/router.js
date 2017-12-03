const middlewares = require('koa-middlewares');
const api = require('../api');

const router = middlewares.router();
router.post('/api', api);

module.exports = router;
