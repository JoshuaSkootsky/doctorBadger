const router = require('express').Router();
const { Practice } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const practiceInstance = new Practice();
    console.log('\nREQ.QUERY: \n', req.query);
    let lat = req.query.lat;
    let long = req.query.long;
    // note this outputs to console
    console.log('lat and long in route practices', lat, long);
    let coords = { lat, long };
    if (!coords) coords = undefined;
    const practices = await practiceInstance.findAll(coords);
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
