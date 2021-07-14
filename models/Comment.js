const { Schema, model } = require("mongoose");

const Comment = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    recipeId: {
      type: String,
      required: true,
    },
    message: String,
    rate: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "comments",
  }
);

module.exports = model("Comment", Comment);
