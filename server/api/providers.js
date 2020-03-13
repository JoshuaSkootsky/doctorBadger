const router = require('express').Router();
const { Provider } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const providers = await Provider.findAll();
    res.json(providers);
  } catch (err) {
    next(err);
  }
});
