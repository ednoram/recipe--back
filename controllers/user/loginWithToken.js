const { verifyUser, createJWT, findUserByEmail } = require("../../utils");

const loginWithToken = async (req, res) => {
  try {
    const { token } = req.body;
    const { email } = await verifyUser(token, res);
    const user = await findUserByEmail(email);
    const accessToken = createJWT(email, user._id, "24h", res);

    res.status(200).json({ success: true, data: user, token: accessToken });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = loginWithToken;
