const { User, Token } = require("../../models");
const { CLIENT_URL } = require("../../constants");
const { comparePasswords } = require("../../utils");

const verifyUser = async (req, res) => {
  try {
    const { token, email } = req.query;

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

    await User.findOneAndUpdate({ email }, { $set: { isVerified: true } });

    res.redirect(`${CLIENT_URL}/login`);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = verifyUser;
