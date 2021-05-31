const jwt = require("jsonwebtoken");

const createJWT = (email, _id, duration, res) => {
  try {
    const payload = { email, _id, duration };

    return jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: duration,
    });
  } catch (err) {
    res.status(200).json({ errors: [{ message: err.message }] });
  }
};

module.exports = createJWT;
