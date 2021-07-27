const { Recipe } = require("../../models");

const postRecipe = async (req, res) => {
  try {
    const { title, summary, mealType, ingredients, steps, imageId, imageUrl } =
      req.body;
    const user = req.user;

    const { email } = user;

    const newRecipe = new Recipe({
      title,
      email,
      steps,
      summary,
      imageId,
      mealType,
      imageUrl,
      ingredients,
    });

    const savedRecipe = await newRecipe.save();

    res.status(200).json(savedRecipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = postRecipe;
