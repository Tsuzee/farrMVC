const path = require('path');

const gamePage = (req, res) => {
  const data = {
    id: req,
  };

  res.sendFile(path.resolve(`${__dirname}/../../client/sevencrystals.html`), data);
};


module.exports.gamePage = gamePage;
