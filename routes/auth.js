var express = require("express");
var router = express.Router();

var auth_controller = require("../controllers/authController");

router.get("/login", function(req, res) {
  res.redirect(auth_controller.getLoginURL(req, res));
});

router.get("/authorize", async function(req, res) {
    var authCode = await req.query.code;
    if (authCode) {
        auth_controller.authorize(req, res, authCode);
    } else {
    }
});

module.exports = router;
