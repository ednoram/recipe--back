const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const { userRoutes, recipesRoutes } = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/recipes", recipesRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
