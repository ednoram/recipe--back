const { User } = require("../../models");

const addFavoriteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (user.favoriteRecipes.includes(recipeId)) {
      return res.status(200).json(user);
    }

    const newFavoriteRecipes = [...user.favoriteRecipes, recipeId];

    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { favoriteRecipes: newFavoriteRecipes } },
      { returnOriginal: false }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = addFavoriteRecipe;
