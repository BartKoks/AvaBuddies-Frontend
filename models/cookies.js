var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
app.use(cookieParser());

module.exports = {
  setCookie: function(req, res, cookieName, cookieValue) {
    res.cookie(cookieName, cookieValue, { maxAge: 900000, httpOnly: true });
  },

  getCookie: function(req, res, cookieName) {
    var cookieValue = req.cookies[cookieName];
    if (cookieValue) {
      return cookieValue;
    }
  }
};
