const { User } = require("../models");
const { verifyJWT } = require("../utils");

const verify = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ errors: [{ auth: "Not authorized" }] });
    }

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ errors: [{ user: "User not found" }] });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = verify;
