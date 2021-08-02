const { User } = require("@models");
const { hashPassword, comparePasswords } = require("@utils");

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    if (String(user._id) !== id) {
      return res
        .status(422)
        .json({ errors: [{ message: "User id or token is invalid" }] });
    }

    const passwordIsCorrect = await comparePasswords(
      currentPassword,
      user.password
    );

    if (!passwordIsCorrect) {
      return res
        .status(403)
        .json({ errors: [{ password: "Password is incorrect" }] });
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { password: hashedPassword } }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = changePassword;
