const Post = require("../models/postsModel");
const successHandle = require("../service/successHandle");
const errorHandle = require("../service/errorHandle");

const postController = {
  getPosts: async (res) => {
    const getPosts = await Post.find();
    successHandle(res, "成功取得全部貼文", getPosts);
  },
  createPost: async (req, res) => {
    try {
      const data = req.body;
      const createPost = await Post.create({
        name: data.name,
        content: data.content,
        type: data.type,
        tags: data.tags,
        image: data.image,
        likes: data.likes,
        comments: data.comments
      });
      successHandle(res, "成功新增貼文", createPost);
    } catch (err) {
      errorHandle(res, err);
    }
  },
  updatePost: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const validKeyList = [
        "name",
        "content",
        "type",
        "tags",
        "image",
        "likes",
        "comments"
      ];
      const updatData = {};
      Object.keys(data).forEach((item) => {
        if (validKeyList.includes(item)) {
          updatData[item] = data[item];
        }
      });
      const updatePost = await Post.findByIdAndUpdate(id, updatData);
      successHandle(res, "成功更新貼文", updatePost);
    } catch (err) {
      errorHandle(res, err);
    }
  },
  deletePosts: async (res) => {
    await Post.deleteMany({});
    successHandle(res, "成功刪除全部貼文");
  },
  deletePost: async (req, res) => {
    try {
      const id = req.params.id;
      const deletePost = await Post.findByIdAndDelete(id);
      successHandle(res, "成功刪除該則貼文", deletePost);
    } catch (err) {
      errorHandle(res, err);
    }
  }
};

module.exports = postController;
