const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  phone: { type: Number },
  verified: { type: Boolean }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;