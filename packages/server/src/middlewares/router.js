const createRouter = require('koa-router');
const api = require('../api');

const router = createRouter();
router.post('/api', api);

module.exports = router;
