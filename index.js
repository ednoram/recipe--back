const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  userRoutes,
  recipesRoutes,
  uploadsRoutes,
  commentsRoutes,
} = require("./routes");
const { PORT } = require("./constants");
const { connectDB } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/uploads", express.static("uploads"));

app.use("/api/user", userRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/comments", commentsRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
