const { User } = require("../../models");
const { verifyJWT } = require("../../utils");

const verifyUser = async (req, res) => {
  try {
    const { token } = req.query;

    const { email } = await verifyJWT(token, res);

    if (email) {
      await User.findOneAndUpdate({ email }, { $set: { isVerified: true } });
      res.send("Account is verified, you can close this tab.");
    } else {
      res.send("User not verified.");
    }
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = verifyUser;
