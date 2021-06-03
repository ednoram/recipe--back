const { Recipe } = require("../../models");
const { verifyUser } = require("../../utils");

const postRecipe = async (req, res) => {
  try {
    const { title, summary, mealType, ingredients, steps, token } = req.body;

    const { email } = await verifyUser(token, res);

    const newRecipe = new Recipe({
      title,
      email,
      steps,
      summary,
      mealType,
      ingredients,
    });

    newRecipe.save().then((recipe) => {
      res.status(200).json(recipe);
    });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = postRecipe;
