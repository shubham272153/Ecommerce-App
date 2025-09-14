import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import path from "path";
//App config
const app = express();
const port = process.env.PORT || 5001;

// Database and Cloudinary connections
connectDB();
connectCloudinary();

// Middleware
app.use(cors());

// This middleware parses incoming JSON requests and makes it available in req.body
app.use(express.json()); // This is important to parse JSON request bodies

// This middleware is optional if you're dealing with URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// API endpoint
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
// Uploads folder ko public banado
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Listen
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
