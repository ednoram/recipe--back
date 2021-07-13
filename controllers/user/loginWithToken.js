const { User } = require("../../models");
const { TOKEN_EXPIRY } = require("../../constants");
const { createJWT, verifyJWT } = require("../../utils");

const loginWithToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(202).json(null);
    }

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ errors: [{ message: "Account is not verified" }] });
    }

    const newToken = createJWT(email, user._id, TOKEN_EXPIRY, res);

    res.cookie("token", newToken, {
      secure: true,
      httpOnly: true,
      maxAge: TOKEN_EXPIRY * 1000,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = loginWithToken;
