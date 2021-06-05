const { User } = require("../../models");
const { findUserByEmail } = require("../../utils/find");
const { comparePasswords, verifyUser, hashPassword } = require("../../utils");

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { token, currentPassword, newPassword, passwordConfirmation } =
      req.body;

    const { email } = await verifyUser(token, res);
    const user = await findUserByEmail(email);

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

    User.findOneAndUpdate(
      { email: user.email },
      { $set: { password: hashedPassword } },
      (err, user) => {
        if (err) {
          return res.status(500).json({ errors: [{ message: err.message }] });
        }

        return res.status(200).json(user);
      }
    );
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = changePassword;
