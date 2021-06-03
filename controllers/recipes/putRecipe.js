const { Recipe } = require("../../models");
const { verifyUser, findRecipeByID } = require("../../utils");

const putRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { token, title, summary, mealType, ingredients, steps } = req.body;

    const recipe = await findRecipeByID(id);
    const { email } = await verifyUser(token, res);

    if (!recipe) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (recipe.email !== email) {
      return res
        .status(422)
        .json({ errors: [{ message: "Recipe doesn't belong to user" }] });
    }

    const properties = { title, summary, mealType, ingredients, steps };

    const modifiedProperties = Object.keys(properties).reduce((acc, i) => {
      const _acc = acc;
      if (properties[i] !== undefined) _acc[i] = properties[i];
      return _acc;
    }, {});

    Recipe.findOneAndUpdate(
      { _id: id },
      { $set: { ...modifiedProperties } },
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

module.exports = putRecipe;
