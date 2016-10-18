const path = require('path');

const main = (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../../client/sevencrystals.html`));
};

module.exports.main = main;
