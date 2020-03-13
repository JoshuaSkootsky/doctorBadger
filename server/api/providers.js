const router = require('express').Router();
const { Practice } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    console.log('about to try to find all', Practice);
    const practices = await Practice.findAll();
    res.send(practices);
  } catch (err) {
    next(err);
  }
});
