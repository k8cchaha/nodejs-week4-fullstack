const User = require("../models/usersModel");
const successHandle = require("../service/successHandle");
const errorHandle = require("../service/errorHandle");

const userController = {
  getUsers: async (res) => {
    const getUsers = await User.find();
    successHandle(res, "成功取得全部作者", getUsers);
  },
  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      const getUser = await User.findById(id);
      if (getUser) {
        successHandle(res, "成功取得作者", getUser);
      } else {
        errorHandle(res, err, "作者不存在");
      }
    } catch (err) {
      errorHandle(res, err);
    }
  }
};

module.exports = userController;
