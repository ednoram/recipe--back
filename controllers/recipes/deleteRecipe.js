const fs = require("fs");

const { Recipe } = require("../../models");
const { findRecipeByID, verifyUser } = require("../../utils");

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.body;

    const recipe = await findRecipeByID(id);
    const user = await verifyUser(token, res);

    if (!recipe) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (recipe.email !== user.email) {
      return res
        .status(422)
        .json({ errors: [{ message: "Recipe doesn't belong to user" }] });
    }

    if (recipe.imagePath) {
      await fs.unlink(recipe.imagePath, () => {});
    }

    Recipe.findOneAndDelete({ _id: id }).then((recipe) =>
      res.status(200).json(recipe)
    );
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = deleteRecipe;
