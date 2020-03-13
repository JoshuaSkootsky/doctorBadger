const fs = require('fs');
// I want to import Bluebird and return a promise?

// represents a medical practice.
// Currently mocking up making an API call by reading from file
class Practice {
  constructor() {
    this.name = 'name';
  }
  findAll() {
    const fileName = '../../../practices.json';
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const contents = JSON.parse(data);
      console.log(contents);
      return contents;
    });
  }
}

module.exports = Practice;
