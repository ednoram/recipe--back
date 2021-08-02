const { FavoriteRecipe, Recipe } = require("@models");

const postFavoriteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const user = req.user;

    const { email } = user;

    const foundRecipe = await Recipe.findOne({ _id: recipeId });

    if (!foundRecipe) {
      return res
        .status(404)
        .json({ errors: [{ message: "Recipe not found" }] });
    }

    const foundFavorite = await FavoriteRecipe.findOne({ email, recipeId });

    if (foundFavorite) {
      return res.status(202).json(foundFavorite);
    }

    const newFavoriteRecipe = await new FavoriteRecipe({
      email,
      recipeId,
    }).save();

    res.status(200).json(newFavoriteRecipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = postFavoriteRecipe;
