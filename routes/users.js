var express = require("express");
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var fullToken = "Bearer " + req.app.locals.token;
  var fullURL = process.env.API_URL + "/user/list";

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
      users: JSON.parse(body)
    };

    res.render("users/index", params);
  });
});


router.get("/:id", function(req, res, next) {
  var fullToken = "Bearer " + req.app.locals.token;
  var fullURL = process.env.API_URL + "/user/" + req.params.id;

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
      user: JSON.parse(body).user
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
  var fullURL = process.env.API_URL + "/user/updateuser";

  var options = {
    method: 'POST',
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
  var fullURL = process.env.API_URL + "/user/destroy/"+req.params.id;
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
