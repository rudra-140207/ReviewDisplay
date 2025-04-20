import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import testimonialRoutes from "./routes/Testimonials.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ["http://localhost:5173","https://kiet-testimonial.onrender.com"], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/testinomial", testimonialRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected successfully.");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed:", err));

  app.get("/", (req, res) => {
    res.send("Hello from the backend!");
  });