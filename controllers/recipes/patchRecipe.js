const fs = require("fs");

const { Recipe } = require("../../models");
const { verifyUser, findRecipeByID } = require("../../utils");

const patchRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { token, title, summary, mealType, ingredients, imagePath, steps } =
      req.body;

    const recipe = await findRecipeByID(id);
    const { email } = await verifyUser(token, res);

    if (title === "") {
      return res.status(422).json({
        errors: [{ title: "Title must be at least 1 character long" }],
      });
    }

    if (!recipe) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (recipe.email !== email) {
      return res
        .status(422)
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

    Recipe.findOneAndUpdate(
      { _id: id },
      { $set: { ...properties } },
      { returnOriginal: false },
      (err, recipe) => {
        if (err) {
          return res.status(500).json({ errors: [{ message: err.message }] });
        } else {
          return res.status(200).json({ success: true, data: recipe });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = patchRecipe;
