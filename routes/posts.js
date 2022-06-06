var express = require("express");
var router = express.Router();
var postController = require("../controllers/postsController");

router.get("/", function (req, res) {
  postController.getPosts(req, res);
});

router.post("/", function (req, res) {
  postController.createPost(req, res);
});

router.delete("/", function (req, res) {
  postController.deletePosts(res);
});

router.patch("/:id", function (req, res) {
  postController.updatePost(req, res);
});

router.delete("/:id", function (req, res) {
  postController.deletePost(req, res);
});

module.exports = router;
