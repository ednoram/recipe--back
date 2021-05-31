const { Recipe } = require("../../models");

const postRecipe = (req, res) => {
  try {
    const { title, summary, mealType, ingredients, steps, userEmail } =
      req.body;

    const newRecipe = new Recipe({
      title,
      steps,
      summary,
      mealType,
      userEmail,
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
