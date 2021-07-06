const User = require("../../models/User");
const { verifyJWT, createJWT } = require("../../utils");

const loginWithToken = async (req, res) => {
  try {
    const { token } = req.body;

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ errors: [{ message: "Account is not verified" }] });
    }

    const accessToken = createJWT(email, user._id, "24h", res);

    res.status(200).json({ success: true, data: user, token: accessToken });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = loginWithToken;
