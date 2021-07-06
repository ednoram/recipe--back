const fs = require("fs");

const { verifyJWT } = require("../../utils");
const { Recipe, User } = require("../../models");

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.body;

    const recipe = await Recipe.findOne({ _id: id });
    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (!recipe) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (recipe.email !== user.email) {
      return res
        .status(401)
        .json({ errors: [{ message: "Recipe doesn't belong to user" }] });
    }

    if (recipe.imagePath) {
      await fs.unlink(recipe.imagePath, () => {});
    }

    const deletedRecipe = await Recipe.findOneAndDelete({ _id: id });

    res.status(200).json(deletedRecipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = deleteRecipe;
