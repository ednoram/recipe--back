const { sendVerificationEmail, findUserByEmail } = require("../../utils");

const sendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (user.isVerified) {
      return res
        .status(500)
        .json({ errors: [{ message: "Account is verified" }] });
    }

    await sendVerificationEmail(user, req, res);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = sendVerification;
