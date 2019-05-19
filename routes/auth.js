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
    res.cookie('token', objectValue["token"]);
    if (!objectValue["token"]) {
      console.log("notoken");
      res.redirect("/auth/login");
    } else {
      var decoded = jwt_decode(objectValue["token"]);
      res.cookie('user', decoded.user);

      if (decoded.user.email.split('@')[1] == 'projectsoa.onmicrosoft.com') {
        res.redirect("/");
      } else {
        res.redirect("/auth/login");
      }

    }
  });
});

router.get("/signout", function(req, res) {
  req.session.destroy(function(err) {
    req.logout();
    res.clearCookie("user");
    res.clearCookie("token");
    res.redirect("/");
  });
});

module.exports = router;
