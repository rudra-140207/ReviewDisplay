import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    branch: String,
    rollNo: String,
    mentor: String,
    photo: String,
    message: String,
    motivation: String,
    remark: String,
    placedAt: String,
    linkedinUrl: String,
    mobile: String,
    emailId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
