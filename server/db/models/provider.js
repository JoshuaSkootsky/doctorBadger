const fs = require('fs');

class Provider {
  constructor() {
    this.name = 'name';
  }
  findAll() {
    fs.readFile('../../../practices.json', 'utf8', function(err, data) {
      if (err) throw err;
      const contents = JSON.parse(data);
      console.log(contents);
    });
  }
}

module.exports = Provider;
