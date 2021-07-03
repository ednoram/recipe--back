const { createJWT } = require("../utils");
const { SENDER_EMAIL } = require("../constants");
const { emailTransporter } = require("../middleware");

const sendRecoveryEmail = async (user, res) => {
  const tokenExpiresIn = 1800;
  const accessToken = createJWT(user.email, user._id, tokenExpiresIn, res);

  const mailSubject = "Recover Password - Recipe";
  const mailHtml = `
      <h1>Recipe - Recover your password</h1>
      <p>This is your access token: ${accessToken}</p>
      <p>Make sure no one else can get this token in ${
        tokenExpiresIn / 60
      } minutes.</p>
    `;

  const mailOptions = {
    from: `"Recipe" ${SENDER_EMAIL}`,
    html: mailHtml,
    to: user.email,
    subject: mailSubject,
  };

  await emailTransporter.sendMail(mailOptions);
};

module.exports = sendRecoveryEmail;
