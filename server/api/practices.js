const router = require('express').Router();
const { Practice } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const practiceInstance = new Practice();
    console.log('REQ.QUERY: ', req.query);
    let lat = req.query.lat;
    let long = req.query.long;
    let coords = { lat, long };
    if (!coords) coords = undefined;
    const practices = await practiceInstance.findAll(coords);
    // normalize the practices for the redux state
    const normalized = {};
    practices.data.map(practice => {
      const uid = practice.uid;
      const newPatients = practice.accepts_new_patients;
      normalized[uid] = {
        uid,
        newPatients,
        name: practice.name,
        address: practice.visit_address,
        phone: practice.phones
          .map(phone => phone.type + ' - ' + phone.number)
          .join(',  '),
      };
    });
    console.log('normalized', normalized);
    res.send(normalized);
  } catch (err) {
    next(err);
  }
});
