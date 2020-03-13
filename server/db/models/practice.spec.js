const { Practice } = require('./');
const { expect } = require('chai');

// these tests only work locally for now until it is hooked up to the web api
const practice = new Practice();

const readPractices = async params => {
  const data = await practice.findAll(params);
  // console.log(data);
  return data;
};

readPractices(); // prints to console

describe('Practice model', () => {
  // beforeEach(() => {
  //   return db.sync({ force: true });
  // });

  describe('class methods', () => {
    describe('finds all w/o arguments', () => {
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
    }); // end describe('finds all w/o arguments ')

    describe('finds all w/ arguments', () => {
      let practices;
      let coords = { latitude: 40.85864, longitude: -73.94772 };

      beforeEach(async () => {
        practices = await readPractices(coords);
      });

      it('returns data with a meta attribute', () => {
        expect(typeof practices.meta === 'object').to.be.equal(true);
      });

      it('returns data with a data array', () => {
        expect(practices.data.length > 0).to.be.equal(true);
      });

      it('returns data  with coordinates that are correct', () => {
        expect(practices.data[0].lat > coords.latitude - 1);
        expect(practices.data[0].lat < coords.latitude + 1);
      });
    });
  }); // end describe('class nethodsMethods')
}); // end describe('Practice model')
