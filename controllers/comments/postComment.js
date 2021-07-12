const { Comment, Recipe } = require("../../models");

const postComment = async (req, res) => {
  try {
    const { recipeId, message } = req.body;
    const user = req.user;

    const recipe = await Recipe.findOne({ _id: recipeId });

    if (!recipe) {
      return res
        .status(404)
        .json({ errors: [{ message: "Recipe not found" }] });
    }

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    const { email } = user;
    const newComment = new Comment({ email, recipeId, message });

    const savedComment = await newComment.save();

    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};
module.exports = postComment;
