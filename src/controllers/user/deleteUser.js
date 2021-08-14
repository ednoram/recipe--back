const { User, Recipe, Comment } = require("@models");
const { comparePasswords, cloudUploader } = require("@utils");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    const passwordIsCorrect = await comparePasswords(password, user.password);

    if (!passwordIsCorrect) {
      return res
        .status(403)
        .json({ errors: [{ message: "Password is incorrect" }] });
    }

    const userRecipes = await Recipe.find({ email: user.email });

    userRecipes.map(async ({ imageId }) => {
      if (imageId) {
        await cloudUploader.destroy(imageId);
      }
    });

    await Recipe.deleteMany({ email: user.email });
    await Comment.deleteMany({ email: user.email });
    await User.findOneAndDelete({ _id: id });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = deleteUser;
