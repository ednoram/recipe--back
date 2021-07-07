const { User } = require("../../models");
const { verifyJWT, hashPassword, comparePasswords } = require("../../utils");

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { token, currentPassword, newPassword, passwordConfirmation } =
      req.body;

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ errors: [{ message: "User does not exist" }] });
    }

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

    if (passwordConfirmation !== newPassword) {
      res.status(422).json({
        errors: [
          {
            passwordConfirmation:
              "Password confirmation and new password do not match",
          },
        ],
      });
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
