import mongoose from "mongoose";
const photoModel = new mongoose.Schema(
  {
    images: [String],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);
const Photo = mongoose.model("Photo", photoModel);
export default Photo;
