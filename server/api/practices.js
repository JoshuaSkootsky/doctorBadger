const router = require('express').Router();
const { Practice } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const practiceInstance = new Practice();
    const practices = await practiceInstance.findAll();
    // normalize the practices for the redux state
    const normalized = {};
    practices.data.map((practice, index) => {
      normalized[index] = {
        index,
        newPatients: practice.accepts_new_patients,
        address: practice.visit_address,
        phone: practice.phones
          .map(phone => phone.type + ' - ' + phone.number)
          .join(',  '),
        languages: practice.languages
          .map(language => language.name)
          .join(',  '),
      };
    });

    res.send(normalized);
  } catch (err) {
    next(err);
  }
});
