const { Recipe } = require("@models");

const getRecipes = async (req, res) => {
  try {
    const { email } = req.query;

    if (email) {
      const recipes = await Recipe.find({ email });
      res.status(200).json(recipes);
    } else {
      const recipes = await Recipe.find();
      res.status(200).json(recipes);
    }
  } catch (err) {
    res.status(404).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getRecipes;
