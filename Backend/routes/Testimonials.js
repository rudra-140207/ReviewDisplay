import express from "express";
import Testimonial from "../models/Testimonials.js";

const router = express.Router();

// Add a new testimonial
router.post("/", async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json({ message: "Testimonial saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving testimonial." });
  }
});

// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch testimonials." });
  }
});

export default router;
