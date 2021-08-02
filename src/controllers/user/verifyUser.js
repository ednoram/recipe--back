const { CLIENT_URL } = require("@config");
const { User, Token } = require("@models");
const { comparePasswords } = require("@utils");

const verifyUser = async (req, res) => {
  try {
    const { token, email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (user.isVerified) {
      await Token.findOneAndDelete({ email });

      res.redirect(`${CLIENT_URL}/login`);
    }

    const tokenFromDB = await Token.findOne({ email });

    if (!tokenFromDB) {
      return res.status(401).json({
        errors: [{ message: "User does not have a token" }],
      });
    }

    const tokenIsMatching = await comparePasswords(token, tokenFromDB.token);

    if (!tokenIsMatching) {
      return res
        .status(401)
        .json({ errors: [{ token: "Token is not valid" }] });
    }

    await Token.findOneAndDelete({ email });

    await User.findOneAndUpdate({ email }, { $set: { isVerified: true } });

    res.redirect(`${CLIENT_URL}/login`);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = verifyUser;
