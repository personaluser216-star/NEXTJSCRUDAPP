import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.test ||
  mongoose.model("test", testSchema);
