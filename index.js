// パッケージ読み込み
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const logger = require('morgan');

require('dotenv').config();

const port = process.env.PORT || 8080;

// Crossを有効
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

// Optionsも必要
app.options('*', (req, res) => {
  res.sendStatus(200);
});

app.get('/', function (req, res) {
  res.send('Analysis system server is running...');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ログの保存場所
const logDirectory = path.join(__dirname, './log');

//指定したディレクトリが存在するか？
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//ファイルストリームを作成
const accessLogStream = fs.createWriteStream(logDirectory + '/access.log');

//ログのフォーマット
const preFormat = ':date[clf] - :method :url - :response-time ms';

//ロガーのセットアップ
app.use(logger(preFormat, {
  stream: accessLogStream
}));

app.use(express.static('public'));

const apiRoutes = require("./routes/api.js");
app.use('/api', apiRoutes);

app.listen(port);
console.log('サーバを起動しました。http://localhost:' + port);

