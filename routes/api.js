const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');
const VerifyToken = require('../middlewares/verifyToken');

const userController = require('../controllers/UserController');
const streamingController = require('../controllers/StreamingController');
const instructionController = require('../controllers/InstructionController');

//configファイルから環境に応じた内容を取得
router.post('/authenticate', [
  check('name').isLength({min: 1}),
  check('password').isLength({min: 5})
], userController.authenticate);
router.get('/me', VerifyToken, userController.me);

// projects
router.get('/streaming/get-img-url/', streamingController.getImgUrl);
router.get('/instruction/get-history/', instructionController.getHistory);
module.exports = router;
