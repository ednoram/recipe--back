const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { PORT } = require("./constants");
const { connectDB } = require("./config");
const { userRoutes, recipesRoutes, uploadsRoutes } = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/uploads", express.static("uploads"));

app.use("/api/user", userRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/recipes", recipesRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
