const streaming = require('../models/Streaming');

module.exports = {
  getImgUrl: function (req, res, _) {

    streaming.getImgUrl()
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
