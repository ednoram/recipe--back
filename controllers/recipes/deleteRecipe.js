const { Recipe } = require("../../models");
const { findRecipeByID, verifyUser } = require("../../utils");

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.body;

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

    Recipe.findOneAndDelete({ _id: id }).then((recipe) =>
      res.status(200).json({ success: true, data: recipe })
    );
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = deleteRecipe;
