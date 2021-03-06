const { Schema, model } = require("mongoose");

const Recipe = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageId: String,
    imageUrl: {
      type: String,
      default: "",
    },
    summary: String,
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "dessert", "snack", "any"],
      default: "any",
    },
    ingredients: [
      {
        type: String,
        default: [],
      },
    ],
    steps: [
      {
        type: String,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    collection: "recipes",
  }
);

module.exports = model("Recipe", Recipe);
