const { FavoriteRecipe } = require("../../models");

const getFavoriteRecipes = async (req, res) => {
  try {
    const user = req.user;

    const { email } = user;

    const favoriteRecipes = await FavoriteRecipe.find({ email });

    res.status(200).json(favoriteRecipes);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getFavoriteRecipes;
