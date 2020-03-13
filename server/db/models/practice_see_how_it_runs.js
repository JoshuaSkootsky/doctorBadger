const { Practice } = require('./');

const practice = new Practice();

const readPractices = async () => {
  const data = await practice.findAll();
  console.log(data);
};

readPractices();
