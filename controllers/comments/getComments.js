const { Comment } = require("../../models");

const getComments = async (req, res) => {
  try {
    const { recipeId } = req.query;

    if (recipeId) {
      const comments = await Comment.find({ recipeId });
      res.status(200).json(comments);
    } else {
      const comments = await Comment.find();
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getComments;
