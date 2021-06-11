const fs = require("fs");

const { User, Recipe } = require("../../models");
const { comparePasswords, findUserByID } = require("../../utils");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const user = await findUserByID(id);

    if (!user) {
      res.status(404).json({ errors: [{ message: "User does not exist" }] });
    }

    const passwordIsCorrect = await comparePasswords(password, user.password);

    if (!passwordIsCorrect) {
      return res
        .status(403)
        .json({ errors: [{ message: "Password is incorrect" }] });
    }

    await Recipe.find({ email: user.email }).then((recipes) => {
      recipes.forEach(async (recipe) => {
        if (recipe.imagePath) {
          await fs.unlink(recipe.imagePath, () => {});
        }
      });
    });

    await Recipe.deleteMany({ email: user.email });

    User.findOneAndDelete({ _id: id }, (err) => {
      if (err) {
        return res.status(500).json({ errors: [{ message: err.message }] });
      }

      return res.status(200).json({ success: true });
    });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = deleteUser;
