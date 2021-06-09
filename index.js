const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config");
const { userRoutes, recipesRoutes, uploadsRoutes } = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/recipes", recipesRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
