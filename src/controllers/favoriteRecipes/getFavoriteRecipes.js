const { verifyJWT } = require("../../utils");
const { FavoriteRecipe, User } = require("../../models");

const getFavoriteRecipes = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(403).json({ errors: [{ token: "Token is required" }] });
    }

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ errors: [{ user: "User not found" }] });
    }

    const favoriteRecipes = await FavoriteRecipe.find({ email });

    res.status(200).json(favoriteRecipes);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getFavoriteRecipes;
