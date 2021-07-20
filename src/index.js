const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const {
  userRoutes,
  recipesRoutes,
  uploadsRoutes,
  commentsRoutes,
  favoriteRecipesRoutes,
} = require("./routes");
const { PORT } = require("./constants");
const { connectDB } = require("./config");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use("/api/public/uploads", express.static("public/uploads"));

app.use("/api/user", userRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/favorite-recipes", favoriteRecipesRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));