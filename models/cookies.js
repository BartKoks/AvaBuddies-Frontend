var express = require("express");
const cache = require('memory-cache');

module.exports = {
  setCookie: function(req, res, cookieName, cookieValue) {
    cache.put(cookieName, cookieValue, 21600000, function(key, value) {//6 hours
  });
  },

  getCookie: function(req, res, cookieName) {
    console.log(cache.cookieName);
    var cookieValue = cache.get(cookieName);
    return cookieValue;
  }
};
