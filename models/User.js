const { Schema, model } = require("mongoose");

const User = Schema(
  {
    isVerified: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favoriteRecipes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = model("User", User);
