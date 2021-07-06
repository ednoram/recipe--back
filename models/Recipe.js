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
    imagePath: String,
    summary: String,
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "supper", "snack", "any"],
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
