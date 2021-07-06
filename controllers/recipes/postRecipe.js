const { verifyJWT } = require("../../utils");
const { Recipe, User } = require("../../models");

const postRecipe = async (req, res) => {
  try {
    const { title, summary, mealType, ingredients, steps, imagePath, token } =
      req.body;

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (!user.isVerified) {
      return res
        .status(401)
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

    const savedRecipe = await newRecipe.save();

    res.status(200).json(savedRecipe);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = postRecipe;
