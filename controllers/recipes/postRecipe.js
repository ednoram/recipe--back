const { Recipe } = require("../../models");
const { verifyJWT, findUserByEmail } = require("../../utils");

const postRecipe = async (req, res) => {
  try {
    const { title, summary, mealType, ingredients, steps, imagePath, token } =
      req.body;

    const { email } = await verifyJWT(token, res);
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    } else if (!user.isVerified) {
      return res
        .status(500)
        .json({ errors: [{ message: "Account is not verified" }] });
    }

    const newRecipe = new Recipe({
      title,
      email,
      steps,
      summary,
      mealType,
      imagePath,
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
