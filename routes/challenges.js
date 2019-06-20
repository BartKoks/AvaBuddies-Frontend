var express = require("express");
var router = express.Router();
var request = require("request");

/*challenges. */

router.post("/", function(req, res, next) {
  var fullToken = "Bearer " + req.cookies['token'];
  var fullURL = process.env.API_URL + "/challenges";

  var options = {
    method: 'POST',
    url: fullURL,
    headers: {
      "cache-control": "no-cache",
      Authorization: fullToken
    },
    form: {
      title: req.body.title,
      description: req.body.description,
      task: req.body.task,
      amount: req.body.amount,
      image: req.body.image
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    var result = JSON.parse(body);

    res.redirect("/challenges/"+result._id);
  });

});

router.get("/", function(req, res, next) {
  var fullToken = "Bearer " + req.cookies['token'];
  var fullURL = process.env.API_URL + "/challenges";

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
        challenges: true
      },
      challenges: JSON.parse(body),
      loggedUser: req.cookies['user']
    };

    res.render("challenges/index", params);
  });
});

router.get("/create", function(req, res, next) {
    let params = {
      active: {
        challenges: true
      },
      loggedUser: req.cookies['user']
    };

    res.render("challenges/create", params);
});

router.get("/:id", function(req, res, next) {
  var fullToken = "Bearer " + req.cookies['token'];
  var fullURL = process.env.API_URL + "/challenges/" + req.params.id;

  var options = {
    method: "GET",
    url: fullURL,
    headers: {
      "cache-control": "no-cache",
      Authorization: fullToken
    }
  };
  request(options, function(error, response, body) {
    body = JSON.parse(body);
    if (error) throw new Error(error);
    let params = {
      active: {
        challenges: true
      },
      challenge: body[0],
      loggedUser: req.cookies['user']
    };

    res.render("challenges/show", params);
  });
});

router.delete("/:id", function(req, res, next) {
  var fullToken = "Bearer " + req.cookies['token'];
  var fullURL = process.env.API_URL + "/challenges/"+req.params.id;
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

router.post("/:id", function(req, res, next) {
  var fullToken = "Bearer " + req.cookies['token'];
  var fullURL = process.env.API_URL + "/challenges/"+req.params.id;
  if(!req.body.isPrivate){
    req.body.isPrivate = false
  }
  var options = {
    method: 'PUT',
    url: fullURL,
    headers: {
      "cache-control": "no-cache",
      Authorization: fullToken
    },
    form: {
      title: req.body.title,
      description: req.body.description,
      task: req.body.task,
      amount: req.body.amount,
      image: req.body.image
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.redirect("/challenges/"+req.params.id);
  });

});
module.exports = router;
