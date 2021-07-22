const { Schema, model } = require("mongoose");

const Token = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
  },
  {
    collection: "tokens",
  }
);

module.exports = model("Token", Token);
