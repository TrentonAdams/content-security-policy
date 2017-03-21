var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  var cspReport = req.body["csp-report"];
  console.log(cspReport);
  console.log(cspReport["blocked-uri"]);
  res.send(req.body);
});

module.exports = router;
