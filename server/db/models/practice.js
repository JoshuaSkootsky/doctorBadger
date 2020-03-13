const Promise = require('bluebird');
const fs = require('fs');
const axios = require('axios');
// I want to import Bluebird and return a promise?

// represents a medical practice.
// Currently mocking up making an API call by reading from file
class Practice {
  // in the future, this will have process.env.NODE_ENV === test wrapped around the test data
  async findAll(coords) {
    // '../../../practices.json';
    if (process.env.NODE_ENV === 'test') {
      return new Promise(function(resolve, reject) {
        const fileName = 'practices.json';
        fs.readFile(fileName, (err, data) => {
          err ? reject(err) : resolve(JSON.parse(data));
        });
      });
    }
    // otherwise make a real API call
    try {
      const key = process.env.DOCTORS_API_KEY;
      let location;
      if (coords) {
        console.log('in practice class, reading coords');
        // in practice class, reading coords
        // { lat: '40.858649', long: '-73.94772689999999' }
        location = coords.lat + '%2C' + coords.long;
      }
      const locationWithRadius = location
        ? location + '%2C100'
        : '40.71%2C-74.00%2C100';
      const url =
        'https://api.betterdoctor.com/2016-03-01' +
        '/practices?location=' +
        locationWithRadius +
        '&user_location=' +
        location +
        '&sort=distance-asc&skip=0&limit=12&user_key=' +
        key;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Practice;
