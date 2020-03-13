const router = require('express').Router();
const { Practice } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const practice = new Practice();
    const practices = await practice.findAll();
    // normalize the practices for the redux state
    const normalized = {};
    practices.data.map((practice, index) => {
      normalized[index] = {
        index,
        newPatients: practice.accepts_new_patients,
        address: practice.visit_address,
        phone: practice.phones.map(phone => phone.number),
        languages: practice.languages.map(language => language.name),
      };
    });

    res.send(normalized);
  } catch (err) {
    next(err);
  }
});
