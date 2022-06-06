const Post = require("../models/postsModel");
const User = require("../models/usersModel");
const successHandle = require("../service/successHandle");
const errorHandle = require("../service/errorHandle");

const postController = {
  getPosts: async (req, res) => {
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt";
    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const getPosts = await Post.find(q)
      .populate({
        path: "user",
        select: "name photo "
      })
      .sort(timeSort);
    successHandle(res, "成功取得全部貼文", getPosts);
  },
  createPost: async (req, res) => {
    try {
      const data = req.body;
      const user = await User.findById(data.user);
      if (user) {
        const createPost = await Post.create({
          name: data.name,
          content: data.content,
          user: data.user,
          type: data.type,
          tags: data.tags,
          image: data.image,
          likes: data.likes,
          comments: data.comments
        });
        successHandle(res, "成功新增貼文", createPost);
      } else {
        errorHandle(res, err, "作者不存在");
      }
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
