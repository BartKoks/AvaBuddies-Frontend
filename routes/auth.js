var express = require("express");
var router = express.Router();

var auth_controller = require("../controllers/authController");

router.get("/login", function(req, res) {
  res.redirect(auth_controller.getLoginURL(req, res));

  /*let parms = { title: "Login"};
  
    res.render("login", parms);*/
});

router.get("/authorize", function(req, res) {
    var authCode = req.query.code;
    if (authCode) {
        auth_controller.authorize(req, res, authCode)
    } else {
    }
});

module.exports = router;
