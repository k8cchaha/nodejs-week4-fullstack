const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "請輸入名稱"]
    },
    email: {
      type: String,
      required: [true, "請輸入Email"],
      select: false,
      unique: true,
      lowercase: true
    },
    photo: String
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
