const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = require("@config");

const verifyJWT = async (token, res) => {
  try {
    const decodedData = await jwt.verify(token, TOKEN_SECRET);

    if (!decodedData) {
      res.status(500).json({ errors: [{ message: "Not decoded" }] });
    }

    return decodedData;
  } catch (err) {
    return res.status(500).json({ errors: [{ message: err.message }] });
  }
};
module.exports = verifyJWT;
