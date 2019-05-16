var express = require("express");
var passport = require("passport");
var router = express.Router();
var request = require("request");
var jwt_decode = require('jwt-decode');


router.get('/login', function(req, res, next) {
  let params = {
    active: { home: true }
  };

  // res.render('index', params);
  res.render('index', {params: params, layout: 'login'});
});


/* GET auth callback. */
router.get(
  "/signin",
  function(req, res, next) {
    passport.authenticate("azuread-openidconnect", {
      response: res,
      prompt: "login",
      failureRedirect: "/",
      failureFlash: true
    })(req, res, next);
  },
  function(req, res) {
    res.redirect("/");
  }
);

router.post(
  "/callback",
  function(req, res, next) {
    passport.authenticate("azuread-openidconnect", {
      response: res,
      failureRedirect: "/",
      failureFlash: true
    })(req, res, next);
  },
  function(req, res) {
    res.redirect(307, "/auth/signin-backend");
  }
);

router.post("/signin-backend", function(req, res, next) {
  console.log(res.locals.user.email);
  var options = {
    method: "POST",
    url: process.env.API_URL + "/auth/login",
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      email: res.locals.user.email,
      password: process.env.BACKEND_PASSWORD,
      undefined: undefined
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    var objectValue = JSON.parse(body);
    req.app.locals.token = objectValue["token"];
    console.log(objectValue);
    var decoded = jwt_decode(objectValue["token"]);

    req.app.locals.user = decoded.user;
    console.log(req.app.locals.user);
    res.redirect("/");
  });
});

router.get("/signout", function(req, res) {
  req.session.destroy(function(err) {
    req.logout();
    req.app.locals.user = null;
    res.redirect("/");
  });
});

module.exports = router;
