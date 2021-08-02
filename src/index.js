const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("module-alias/register");

const {
  userRoutes,
  recipesRoutes,
  uploadsRoutes,
  commentsRoutes,
  favoriteRecipesRoutes,
} = require("@routes");
const { PORT } = require("@config");
const { connectDB } = require("@utils");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use("/api/user", userRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/favorite-recipes", favoriteRecipesRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
