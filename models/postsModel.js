const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "名稱必填"]
    },
    content: {
      type: String,
      required: [true, "內容必填"]
    },
    type: {
      type: String
    },
    tags: Array,
    image: String,
    likes: Number,
    comments: Number
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
