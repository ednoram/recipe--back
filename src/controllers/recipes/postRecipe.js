const { Recipe } = require("../../models");

const postRecipe = async (req, res) => {
  try {
    const { title, summary, mealType, ingredients, steps, imagePath } =
      req.body;
    const user = req.user;

    const { email } = user;

    const newRecipe = new Recipe({
      title,
      email,
      steps,
      summary,
      mealType,
      imagePath,
      ingredients,
    });

    const savedRecipe = await newRecipe.save();

    res.status(200).json(savedRecipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = postRecipe;
