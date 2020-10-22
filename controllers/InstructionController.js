const instruction = require('../models/Instruction');

module.exports = {
  getHistory: function (req, res, _) {

    instruction.getHistory()
      .then(data => {
          res.status(200).send(data);
        }
      )
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
};
