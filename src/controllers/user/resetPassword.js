const { User, Token } = require("../../models");
const { hashPassword, comparePasswords } = require("../../utils");

const resetPassword = async (req, res) => {
  try {
    const { email, token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    const tokenFromDB = await Token.findOne({ email });

    if (!tokenFromDB) {
      return res.status(401).json({
        errors: [{ message: "User does not have reset password token" }],
      });
    }

    const tokenIsMatching = await comparePasswords(token, tokenFromDB.token);

    if (!tokenIsMatching) {
      return res.status(401).json({ errors: [{ token: "Access denied" }] });
    }

    await Token.findOneAndDelete({ email });

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = resetPassword;
