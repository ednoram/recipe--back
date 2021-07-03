const { User } = require("../../models");
const { verifyJWT, hashPassword, findUserByEmail } = require("../../utils");

const recoverPassword = async (req, res) => {
  const { token, newPassword, passwordConfirmation } = req.body;

  const { email } = await verifyJWT(token, res);
  const user = await findUserByEmail(email);

  if (!user) {
    res.status(404).json({ errors: [{ message: "User not found" }] });
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
};

module.exports = recoverPassword;
