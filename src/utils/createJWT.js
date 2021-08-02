const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = require("@config");

const createJWT = (email, _id, duration, res) => {
  try {
    const payload = { email, _id, duration };

    return jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: duration,
    });
  } catch (err) {
    res.status(200).json({ errors: [{ message: err.message }] });
  }
};

module.exports = createJWT;
