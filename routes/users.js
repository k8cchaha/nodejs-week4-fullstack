var express = require("express");
var router = express.Router();
var userController = require("../controllers/usersController");

router.get("/", function (req, res) {
  userController.getUsers(res);
});

router.get("/:id", function (req, res) {
  userController.getUser(req, res);
});

module.exports = router;
