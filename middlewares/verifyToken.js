var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');

//configファイルから環境に応じた内容を取得
var config = require('../config/app.json')[app.get('env')];

function verifyToken(req, res, next) {
  var token = req.headers['authorization'];
  if(!token) {
    return res.status(403).send({
      success: false,
      message: 'トークンがありません。',
    });
  }
  token = token.replace('Bearer ','');
  if (token) {

    // jwtの認証をする
    jwt.verify(token, config.secret, function(error, decoded) {
      if (error) {
        return res.json({ success: false, message: 'トークンの認証に失敗しました。' });
      } else {
        // 認証に成功したらdecodeされた情報をrequestに保存する
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // トークンがなければエラーを返す
    return res.status(403).send({
        success: false,
        message: 'トークンがありません。',
    });

  }
}
module.exports = verifyToken;
