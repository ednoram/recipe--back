const fs = require("fs");

const { Recipe } = require("../../models");

const patchRecipe = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { title, summary, mealType, ingredients, imagePath, steps } =
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
      mealType,
      imagePath,
      ingredients,
    };

    Object.keys(properties).forEach((key) => {
      if (
        properties[key] === undefined ||
        (key === "imagePath" && !properties[key])
      ) {
        delete properties[key];
      }
    });

    if (recipe.imagePath && properties.imagePath) {
      await fs.unlink(recipe.imagePath, () => {});
    }

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: id },
      { $set: { ...properties } },
      { returnOriginal: false }
    );

    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = patchRecipe;
