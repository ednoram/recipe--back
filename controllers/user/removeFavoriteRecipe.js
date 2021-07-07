const { User } = require("../../models");
const { verifyJWT } = require("../../utils");

const removeFavoriteRecipe = async (req, res) => {
  try {
    const { token, recipeId } = req.body;

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (!user.favoriteRecipes || !user.favoriteRecipes.includes(recipeId)) {
      return res.status(200).json(user);
    }

    const newFavoriteRecipes = user.favoriteRecipes.filter(
      (id) => id !== recipeId
    );

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { favoriteRecipes: newFavoriteRecipes } },
      { returnOriginal: false }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = removeFavoriteRecipe;
