const { Recipe } = require("../../models");

const getRecipeById = (req, res) => {
  try {
    const { id } = req.params;

    Recipe.findOne({ _id: id }).then((recipe) => {
      res.status(200).json(recipe);
    });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getRecipeById;
