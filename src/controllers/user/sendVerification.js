const { User } = require("@models");
const { sendVerificationEmail } = require("@utils");

const sendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (user.isVerified) {
      return res
        .status(409)
        .json({ errors: [{ message: "Account is verified" }] });
    }

    await sendVerificationEmail(user, req);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = sendVerification;
