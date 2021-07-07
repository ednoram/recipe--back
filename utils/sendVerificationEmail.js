const { createJWT } = require("../utils");
const { SENDER_EMAIL } = require("../constants");
const { emailTransporter } = require("../middleware");

const sendVerificationEmail = async (user, req, res) => {
  const token = createJWT(user.email, user._id, "24h", res);

  const mailSubject = "Email Verification - Recipe";
  const verificationURL = `${req.protocol}://${req.get(
    "host"
  )}/api/user/verify?token=${token}`;
  const mailHtml = `
      <h1>Recipe - Verify your account</h1>
      <p>Click <a href=${verificationURL}>here</a> to verify your account.</p>
    `;

  const mailOptions = {
    from: `"Recipe" ${SENDER_EMAIL}`,
    html: mailHtml,
    to: user.email,
    subject: mailSubject,
  };

  await emailTransporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
