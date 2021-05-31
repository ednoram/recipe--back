const { Schema, model } = require("mongoose");

const Recipe = Schema(
  {
    userEmail: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
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
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "recipes",
  }
);

module.exports = model("Recipe", Recipe);
