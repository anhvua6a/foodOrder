var express = require('express');
var router = express.Router();
let authMiddle = require('../middleware/AuthMiddle')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/abc', authMiddle.checkLogin, function(req, res, next) {
  res.send('abc');
});

module.exports = router;
