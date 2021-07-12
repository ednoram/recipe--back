const { createJWT, mailTransporter } = require("../utils");
const { SENDER_EMAIL, TOKEN_EXPIRY } = require("../constants");

const sendVerificationEmail = async (user, req, res) => {
  const token = createJWT(user.email, user._id, TOKEN_EXPIRY, res);

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

  await mailTransporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
