const { Recipe } = require("../../models");
const { cloudUploader } = require("../../utils");

const patchRecipe = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { title, summary, mealType, ingredients, imageId, imageUrl, steps } =
      req.body;

    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (recipe.email !== user.email) {
      return res
        .status(401)
        .json({ errors: [{ message: "Recipe doesn't belong to user" }] });
    }

    const properties = {
      title,
      steps,
      summary,
      imageId,
      imageUrl,
      mealType,
      ingredients,
    };

    // Remove undefined properties from properties
    const modifiedProperties = JSON.parse(JSON.stringify(properties));

    if (recipe.imageId && modifiedProperties.imageId) {
      await cloudUploader.destroy(recipe.imageId, () => {});
    }

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: id },
      { $set: { ...modifiedProperties } },
      { returnOriginal: false }
    );

    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = patchRecipe;
