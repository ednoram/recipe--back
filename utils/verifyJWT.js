const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = require("../constants");

const verifyJWT = async (accessToken, res) => {
  try {
    const decodedData = await jwt.verify(
      accessToken,
      TOKEN_SECRET,
      (err, user) => {
        if (err) res.status(500).json({ errors: [{ message: err.message }] });

        if (!user) {
          res.status(500).json({ errors: [{ message: "Not decoded" }] });
        }

        return user;
      }
    );

    return decodedData;
  } catch (err) {
    return res.status(500).json({ errors: [{ message: err.message }] });
  }
};
module.exports = verifyJWT;
