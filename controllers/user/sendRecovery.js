const { findUserByEmail, sendRecoveryEmail } = require("../../utils");

const sendRecovery = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    await sendRecoveryEmail(user, res);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = sendRecovery;
