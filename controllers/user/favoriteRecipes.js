const { User } = require("../../models");
const { verifyJWT } = require("../../utils");
const { findUserByEmail } = require("../../utils/find");

exports.addFavoriteRecipe = async (req, res) => {
  try {
    const { token, recipeId } = req.body;

    const { email } = await verifyJWT(token, res);
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    } else if (!user.isVerified) {
      return res
        .status(500)
        .json({ errors: [{ message: "Account is not verified" }] });
    }

    if (user.favoriteRecipes.includes(recipeId)) {
      return res.status(200).json(user);
    }

    const newFavoriteRecipes = [...user.favoriteRecipes, recipeId];

    User.findOneAndUpdate(
      { email },
      { $set: { favoriteRecipes: newFavoriteRecipes } },
      { returnOriginal: false },
      (err, user) => {
        return err
          ? res.status(500).json({ errors: [{ message: err.message }] })
          : res.status(200).json(user);
      }
    );
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

exports.removeFavoriteRecipe = async (req, res) => {
  try {
    const { token, recipeId } = req.body;

    const { email } = await verifyJWT(token, res);
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    } else if (!user.isVerified) {
      return res
        .status(500)
        .json({ errors: [{ message: "Account is not verified" }] });
    }

    if (!user.favoriteRecipes || !user.favoriteRecipes.includes(recipeId)) {
      return res.status(200).json(user);
    }

    const newFavoriteRecipes = user.favoriteRecipes.filter(
      (id) => id !== recipeId
    );

    User.findOneAndUpdate(
      { email },
      { $set: { favoriteRecipes: newFavoriteRecipes } },
      { returnOriginal: false },
      (err, user) => {
        return err
          ? res.status(500).json({ errors: [{ message: err.message }] })
          : res.status(200).json(user);
      }
    );
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};
