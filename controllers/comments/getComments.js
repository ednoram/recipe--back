const { Comment } = require("../../models");

const getComments = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const comments = await Comment.find({ recipeId });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getComments;
