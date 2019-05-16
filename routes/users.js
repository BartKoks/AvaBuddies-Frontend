var express = require("express");
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var fullToken = "Bearer " + req.app.locals.token;
  var fullURL = process.env.API_URL + "/users";

  var options = {
    method: "GET",
    url: fullURL,
    headers: {
      "cache-control": "no-cache",
      Authorization: fullToken
    }
  };
  request(options, function(error, response, body) {
    console.log(body);
    if (error) throw new Error(error);

    let params = {
      active: {
        users: true
      },
      users: JSON.parse(body),
      loggedUser: req.app.locals.user
    };

    res.render("users/index", params);
  });
});

router.get("/profile", function(req, res, next) {
  var fullToken = "Bearer " + req.app.locals.token;
  var fullURL = process.env.API_URL + "/users/profile";

  var options = {
    method: "GET",
    url: fullURL,
    headers: {
      "cache-control": "no-cache",
      Authorization: fullToken
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    let params = {
      active: {
        users: true
      },
      user: JSON.parse(body),
      loggedUser: req.app.locals.user
    };

    res.render("users/profile", params);
  });

});

router.get("/:id", function(req, res, next) {
  var fullToken = "Bearer " + req.app.locals.token;
  var fullURL = process.env.API_URL + "/users/" + req.params.id;

  var options = {
    method: "GET",
    url: fullURL,
    headers: {
      "cache-control": "no-cache",
      Authorization: fullToken
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    let params = {
      active: {
        users: true
      },
      user: JSON.parse(body),
      loggedUser: req.app.locals.user
    };

    res.render("users/show", params);
  });

});


router.post("/:id", function(req, res, next) {
  if (!req.body.isAdmin) {
    req.body.isAdmin = false
  }
  if (!req.body.isPrivate) {
    req.body.isPrivate = false
  }
  var fullToken = "Bearer " + req.app.locals.token;
  var fullURL = process.env.API_URL + "/users/" + req.params.id;

  var options = {
    method: 'PUT',
    url: fullURL,
    headers: {
      "cache-control": "no-cache",
      Authorization: fullToken
    },
    form: {
      name: req.body.name,
      aboutme: req.body.aboutme,
      isAdmin: req.body.isAdmin,
      isPrivate: req.body.isPrivate,
      sharelocation: req.body.sharelocation,
      id: req.params.id
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    res.redirect("/users/"+req.params.id);
  });

});

router.delete("/:id", function(req, res, next) {
  var fullToken = "Bearer " + req.app.locals.token;
  var fullURL = process.env.API_URL + "/users/"+req.params.id;
  console.log(fullURL);
  var options = {
    method: "DELETE",
    url: fullURL,
    headers: {
      "cache-control": "no-cache",
      Authorization: fullToken
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.send(fullURL);
  });
});

module.exports = router;
