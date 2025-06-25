require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
//just to check i m addding thais
const PORT = process.env.PORT || 5000;
const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("E-commerce Backend is Running!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
