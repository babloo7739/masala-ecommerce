
require("dotenv").config(); // ✅ LOAD ENV VARIABLES (VERY IMPORTANT)

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// ✅ Use MONGO_URI from .env (instead of hardcoded)
connectDB(process.env.MONGO_URI);

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "🌶️ Masala E-Commerce API Running!" });
});

// Error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});







