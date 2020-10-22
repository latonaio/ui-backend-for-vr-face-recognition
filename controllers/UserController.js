const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//configファイルから環境に応じた内容を取得
const config = require('../config/app.json')[app.get('env')];
const Users = require('../models/Users.js');

const authConstants = require('../constants/auth.constants');

const {check, validationResult} = require('express-validator/check');

module.exports = {
  authenticate: function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    Users.getUsers().then((users) => {
      const result = users.filter(user => user.user_name === req.body.name);
      if (result[0] === undefined) {
        return res.status(404).send('指定された名前のユーザは存在しません。');
      }
      const user = result[0];
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(403).send('名前またはパスワードが違います。');
      } else {
        const payload = {
          name: user.user_name,
          nickname: user.user_name
        };
        const token = jwt.sign(payload, config.secret);
        res.json({
          token: token
        });
      }
    });
  },
  me: function (req, res, next) {
    Users.getUsers().then((users) => {
      const user = users.filter(user => user.user_name === req.decoded.name);
      if (user[0] === undefined) return res.status(403).send("ユーザが見つかりません。");
      const u = user[0];
      const payload = {
        id: u.user_id,
        name: u.user_name,
        nickname: u.user_name
      };
      res.status(200).send(payload);
    });
  },
  getUser: function (req, res, next) {
    Users.getUsers().then(
      data => res.status(200).send(data)
    );
  }
};