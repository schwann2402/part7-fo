const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: String,
  username: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_document, user) => {
    user.id = user._id.toString();
    delete user.passwordHash;
    delete user._id;
    delete user.__v;
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
