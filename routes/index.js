var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let params = {
    active: { home: true },
    user: req.app.user
  };

  res.render('index', params);
  // res.render('index', {params: params, layout: 'login'});
});


module.exports = router;
