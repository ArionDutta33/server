import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true, lowercase: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
