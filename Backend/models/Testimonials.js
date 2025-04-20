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
    placedAt: String,
    linkedinUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
