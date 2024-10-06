import mongoose from "mongoose";
const photoModel = new mongooseSchema(
  {
    name: { type: String },
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
