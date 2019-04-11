const simpleOauthModule = require("simple-oauth2");
const cookies = require("../models/cookies.js");
const consts = require("../constants.js");
const graph = require("@microsoft/microsoft-graph-client");
const request = require("request");

var clientId = "3ad76aa6-6405-4d8b-bfc6-b5050fa71aaa";
var clientSecret = ":-*6]?X*.{-/={*?]+^?_?I]?4d$+L;|*)=%*=()&";
var redirectUri = "http://localhost:3000/auth/authorize";

var scopes = "User.ReadBasic.All User.Read openid offline_access";

const oauth2 = simpleOauthModule.create({
  client: {
    id: clientId,
    secret: clientSecret
  },
  auth: {
    tokenHost: "https://login.microsoftonline.com",
    tokenPath: "common/oauth2/v2.0/token",
    authorizePath: "common/oauth2/v2.0/authorize"
  },
  options: {
    authorizationMethod: "body"
  }
});

module.exports = {
  getLoginURL: function(req, res) {
    var returnVal = oauth2.authorizationCode.authorizeURL({
      redirect_uri: redirectUri,
      scope: scopes
    });
    return returnVal;
  },

  authorize: async function(req, res, auth_code) {
    try {
      let result = await oauth2.authorizationCode.getToken({
        code: auth_code,
        redirect_uri: redirectUri,
        scope: scopes
      });
      const token = oauth2.accessToken.create(result);
      cookies.setCookie(
        req,
        res,
        "graph_access_token",
        token.token.access_token
      );
    } catch (error) {
      console.error("Access Token Error", error);
      return res.status(500).json("Authentication failed");
    }

    var graph_token = cookies.getCookie(req, res, "graph_access_token");
    var emailadress = await this.getEmail(req, res, graph_token);
    var options = {
      method: "POST",
      url: consts.API_URL + "/auth/login",
      headers: {
        "Postman-Token": "8905252b-bd96-4411-beca-c9c58526f142",
        "cache-control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      form: {
        email: emailadress,
        password: "'8ht98h93tge4219h98hg98h38eahr9guhea' ",
        undefined: undefined
      }
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      var objectValue = JSON.parse(body);

      cookies.setCookie(
        req,
        res,
        "backend_token",
        objectValue["token"]
      );      
    });

    res.redirect('/');
  },

  getEmail: async function(req, res, graph_access_token) {
    if (graph_access_token) {
      // Initialize Graph client
      const client = graph.Client.init({
        authProvider: done => {
          done(null, graph_access_token);
        }
      });

      try {
        // Get the 10 newest messages from inbox
        const result = await client.api("/me/mail").get();
        console.log(result);
        return result.value;
      } catch (err) {
        res.render("error", err);
      }
    }
  }
};
