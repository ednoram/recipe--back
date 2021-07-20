const { createJWT } = require("../../utils");
const { TOKEN_EXPIRY } = require("../../constants");

const loginWithToken = async (req, res) => {
  try {
    const user = req.user;

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ errors: [{ message: "Account is not verified" }] });
    }

    const newToken = createJWT(user.email, user._id, TOKEN_EXPIRY, res);

    res.status(200).json({ user, token: newToken });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = loginWithToken;
