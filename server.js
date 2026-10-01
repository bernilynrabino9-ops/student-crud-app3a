const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/api/students", studentRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
  });