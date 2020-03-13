const Promise = require('bluebird');
const fs = require('fs');
// I want to import Bluebird and return a promise?

// represents a medical practice.
// Currently mocking up making an API call by reading from file
class Practice {
  // in the future, this will have process.env.NODE_ENV === test wrapped around the test data
  findAll() {
    // '../../../practices.json';
    return new Promise(function(resolve, reject) {
      const fileName = 'practices.json';
      fs.readFile(fileName, (err, data) => {
        err ? reject(err) : resolve(JSON.parse(data));
      });
    });
  }
}

module.exports = Practice;
