var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Assignment2 - level3' });
});

router.use("/api", require("./api"));

module.exports = router;
