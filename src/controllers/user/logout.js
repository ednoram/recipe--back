const { TOKEN_EXPIRY } = require("../../constants");

const logout = async (_req, res) => {
  try {
    res.clearCookie("token", {
      secure: true,
      httpOnly: true,
      maxAge: TOKEN_EXPIRY * 1000,
    });
    res.end();
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = logout;
