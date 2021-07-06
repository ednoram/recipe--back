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
  },
  {
    timestamps: true,
    collection: "comments",
  }
);

module.exports = model("Comment", Comment);
