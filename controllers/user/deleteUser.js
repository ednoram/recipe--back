const { User } = require("../../models");
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

    await User.findOneAndDelete({ _id: id }, (err) => {
      if (err) res.status(500).json({ errors: [{ message: err.message }] });

      return res.status(200).json({ success: true });
    });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = deleteUser;
