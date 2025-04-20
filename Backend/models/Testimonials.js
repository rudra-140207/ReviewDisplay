import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    branch: String,
    rollNo: String,
    mentor: String,
    photo: String,
    message: String,
    remark: String,
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
