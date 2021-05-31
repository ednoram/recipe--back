const jwt = require("jsonwebtoken");

const verifyUser = async (accessToken, res) => {
  try {
    const decodedData = await jwt.verify(
      accessToken,
      process.env.TOKEN_SECRET,
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
module.exports = verifyUser;
