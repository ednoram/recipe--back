const User = require("../../models/User");
const { createJWT, verifyJWT, comparePasswords } = require("../../utils");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ errors: [{ message: "Account is not verified" }] });
    }

    const passwordIsCorrect = await comparePasswords(password, user.password);

    if (!passwordIsCorrect) {
      return res
        .status(403)
        .json({ errors: [{ message: "Password is incorrect" }] });
    }

    const token = createJWT(user.email, user._id, "24h", res);
    const decodedUser = await verifyJWT(token, res);

    if (decodedUser) {
      return res.status(200).json({
        success: true,
        data: user,
        token: token,
      });
    } else {
      res.status(401).json({ errors: [{ verification: "Not verified" }] });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = login;
