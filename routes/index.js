var express = require("express");
var router = express.Router();

var dashboard_controller = require("../controllers/dashboardController.js");

router.get("/", async function(req, res) {
  let parms = { title: "Dashboard" };

  var users = await dashboard_controller.getUsers(req, res);
  console.log(users);
  res.render("dashboard", { parameters: parms });
});

module.exports = router;
