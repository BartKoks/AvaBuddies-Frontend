const consts = require("../constants.js");
const graph = require("@microsoft/microsoft-graph-client");
const request = require("request");
const cookies = require("../models/cookies.js");

module.exports = {
  getUsers: async function(req, res) {
    var token = "Bearer ";
    var token = token + cookies.getCookie(req, res, "backend_token");
    console.log("token test");
    console.log(cookies.getCookie(req,res, "backend_token"));
    var options = {
      method: "GET",
      url: consts.API_URL + "/user/list",
      headers: {
        "Postman-Token": "b4600ffd-9b60-470a-9a8f-bf951527d754",
        "cache-control": "no-cache",
        Authorization: "Bearer " + cookies.getCookie(req, res, "backend_token")
      }
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
      //var objectValue = JSON.parse(body);
      //return objectValue["users"];
    });
  }
};
