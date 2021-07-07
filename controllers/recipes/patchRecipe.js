const fs = require("fs");

const { verifyJWT } = require("../../utils");
const { Recipe, User } = require("../../models");

const patchRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { token, title, summary, mealType, ingredients, imagePath, steps } =
      req.body;

    const recipe = await Recipe.findOne({ _id: id });
    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!recipe) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (!user) {
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
