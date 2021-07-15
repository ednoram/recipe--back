const { Schema, model } = require("mongoose");

const FavoriteRecipe = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    recipeId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "favorite_recipes",
  }
);

module.exports = model("Favorite Recipe", FavoriteRecipe);
