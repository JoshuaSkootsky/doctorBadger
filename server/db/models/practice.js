const Promise = require('bluebird');
const fs = require('fs');
// I want to import Bluebird and return a promise?

// represents a medical practice.
// Currently mocking up making an API call by reading from file
class Practice {
  constructor() {
    this.name = 'name';
  }
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
