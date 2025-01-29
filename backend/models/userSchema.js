import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: Number },
  verified: { type: Boolean }
});

export default mongoose.model("User", UserSchema);