const {
  createJWT,
  verifyUser,
  findUserByEmail,
  comparePasswords,
} = require("../../utils");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    const passwordIsCorrect = await comparePasswords(password, user.password);

    if (!passwordIsCorrect) {
      return res
        .status(403)
        .json({ errors: [{ message: "Password is incorrect" }] });
    }

    const accessToken = createJWT(user.email, user._id, "24h", res);
    const decodedUser = await verifyUser(accessToken, res);

    if (decodedUser) {
      return res.status(200).json({
        success: true,
        data: user,
        token: accessToken,
      });
    } else {
      res.status(401).json({ errors: [{ verification: "Not verified" }] });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = login;
