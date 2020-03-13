const { Practice } = require('./');
const { expect } = require('chai');

// these tests only work locally for now until it is hooked up to the web api
const practice = new Practice();

const readPractices = async () => {
  const data = await practice.findAll();
  // console.log(data);
  return data;
};

readPractices(); // prints to console

describe('Practice model', () => {
  // beforeEach(() => {
  //   return db.sync({ force: true });
  // });

  describe('class methods', () => {
    describe('finds all', () => {
      let practices;

      beforeEach(async () => {
        practices = await readPractices();
      });

      it('returns data with a meta attribute', () => {
        expect(typeof practices.meta === 'object').to.be.equal(true);
      });

      it('returns data with a data array', () => {
        expect(practices.data.length > 0).to.be.equal(true);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
