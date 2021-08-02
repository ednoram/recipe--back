const { cloudUploader } = require("@utils");
const { Recipe, Comment } = require("@models");

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (recipe.email !== user.email) {
      return res
        .status(401)
        .json({ errors: [{ message: "Recipe doesn't belong to user" }] });
    }

    if (recipe.imageId) {
      await cloudUploader.destroy(recipe.imageId);
    }

    await Comment.deleteMany({ recipeId: id });

    const deletedRecipe = await Recipe.findOneAndDelete({ _id: id });

    res.status(200).json(deletedRecipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = deleteRecipe;
