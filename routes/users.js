var express = require("express");
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var fullToken = "Bearer " + req.app.locals.token;
  var fullURL = process.env.API_URL + "/user/list";
  console.log(fullURL);
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
    console.log(body);
    let params = {
      active: { users: true },
      users: body
    };
    console.log(params);
    res.render("users", params);
  });
});

module.exports = router;
