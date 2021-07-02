const fs = require("fs");

const { Recipe } = require("../../models");
const { verifyJWT, findRecipeByID, findUserByEmail } = require("../../utils");

const patchRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { token, title, summary, mealType, ingredients, imagePath, steps } =
      req.body;

    const recipe = await findRecipeByID(id);
    const { email } = await verifyJWT(token, res);
    const user = await findUserByEmail(email);

    if (!recipe) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    } else if (!user.isVerified) {
      return res
        .status(500)
        .json({ errors: [{ message: "Account is not verified" }] });
    }

    if (recipe.email !== user.email) {
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
          return res.status(200).json(recipe);
        }
      }
    );
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = patchRecipe;
