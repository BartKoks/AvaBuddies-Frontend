const simpleOauthModule = require("simple-oauth2");
const cookies = require("../models/cookies.js");
const consts = require("../constants.js");

var clientId = "3ad76aa6-6405-4d8b-bfc6-b5050fa71aaa";
var clientSecret = ":-*6]?X*.{-/={*?]+^?_?I]?4d$+L;|*)=%*=()&";
var redirectUri = "http://localhost:3000/auth/authorize";

var scopes = ["User.ReadBasic.All", "User.Read", "openid", "offline_access"];

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
      scope: scopes.join(" ")
    });
    return returnVal;
  },

  authorize: async function(req, res, authCode) {
    const options = {
      authCode,
      redirect_uri: redirectUri
    };

    try {
      const result = await oauth2.authorizationCode.getToken(options);
      const token = oauth2.accessToken.create(result);
      cookies.setCookie(
        req,
        res,
        "graph_access_token",
        token.token.access_token
      );
    } catch (error) {
      console.log(error);

      return res.status(500).json("Authentication failed");
    }

    var graph_token = cookies.getCookie(req, res, "graph_access_token");
    var emailadress = this.getEmail(
      req,
      res,
      graph_token
    );
    console.log("hoi");
    console.log(emailadress);
    console.log("hoi");
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
        password: keys.password,
        undefined: undefined
      }
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
    });
    console.log("done");
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
        return result.value;
      } catch (err) {
        res.render("error", err);
      }
    }
  }
};
