var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.app.locals.user);
  let params = {
    active: { home: true },
    loggedUser: req.app.locals.user
  };

  res.render('index', params);
  // res.render('index', {params: params, layout: 'login'});
});


module.exports = router;
