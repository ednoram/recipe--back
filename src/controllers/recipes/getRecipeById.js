const { Recipe } = require("@models");

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findOne({ _id: id });

    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getRecipeById;
