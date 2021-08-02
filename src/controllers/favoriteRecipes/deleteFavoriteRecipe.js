const { FavoriteRecipe } = require("@models");

const deleteFavoriteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const user = req.user;

    const { email } = user;

    const deletedFavoriteRecipe = await FavoriteRecipe.findOneAndDelete({
      email,
      recipeId,
    });

    if (!deletedFavoriteRecipe) {
      return res.sendStatus(202);
    }

    res.status(200).json(deletedFavoriteRecipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = deleteFavoriteRecipe;
