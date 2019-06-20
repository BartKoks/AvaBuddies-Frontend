var express = require("express");
var router = express.Router();
var request = require("request");

/*tags. */

router.post("/", function(req, res, next) {
  var fullToken = "Bearer " + req.cookies['token'];
  var fullURL = process.env.API_URL + "/tags";

  if(!req.body.isPrivate){
    req.body.isPrivate = false
  }

  var options = {
    method: 'POST',
    url: fullURL,
    headers: {
      "cache-control": "no-cache",
      Authorization: fullToken
    },
    form: {
      name: req.body.name,
      isPrivate: req.body.isPrivate
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    var result = JSON.parse(body);

    res.redirect("/tags/"+result._id);
  });

});

router.get("/", function(req, res, next) {
  var fullToken = "Bearer " + req.cookies['token'];
  var fullURL = process.env.API_URL + "/tags";

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
        tags: true
      },
      tags: JSON.parse(body),
      loggedUser: req.cookies['user']
    };

    res.render("tags/index", params);
  });
});

router.get("/create", function(req, res, next) {
    let params = {
      active: {
        tags: true
      },
      loggedUser: req.cookies['user']
    };

    res.render("tags/create", params);
});

router.get("/:id", function(req, res, next) {
  var fullToken = "Bearer " + req.cookies['token'];
  var fullURL = process.env.API_URL + "/tags/" + req.params.id;

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
        tags: true
      },
      tag: body[0],
      loggedUser: req.cookies['user']
    };

    res.render("tags/show", params);
  });
});

router.delete("/:id", function(req, res, next) {
  var fullToken = "Bearer " + req.cookies['token'];
  var fullURL = process.env.API_URL + "/tags/"+req.params.id;
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
  var fullURL = process.env.API_URL + "/tags/"+req.params.id;
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
      name: req.body.name,
      isPrivate: req.body.isPrivate
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.redirect("/tags/"+req.params.id);
  });

});
module.exports = router;
