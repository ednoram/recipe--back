const { nanoid } = require("nanoid");

const { Token } = require("../models");
const { hashPassword } = require("../utils");
const { emailTransporter } = require("../middleware");
const { SENDER_EMAIL, CLIENT_URL } = require("../constants");

const sendRecoveryEmail = async (user, res) => {
  try {
    const token = nanoid();
    const hashedToken = await hashPassword(token);

    const { email } = user;

    const existingToken = await Token.findOne({ email });

    if (existingToken) {
      await Token.findOneAndDelete({ email });
    }

    await new Token({ email, token: hashedToken }).save();

    const resetPasswordURL = `${CLIENT_URL}/reset-password`;
    const linkHref = `${resetPasswordURL}/${email}/${token}`;
    const mailSubject = "Recover Password - Recipe";
    const mailHtml = `
    <h1>Recipe - Recover your password</h1>
    <p>Click <a href="${linkHref}">here</a> to reset your password.</p>
  `;

    const mailOptions = {
      from: `"Recipe" ${SENDER_EMAIL}`,
      to: email,
      subject: mailSubject,
      html: mailHtml,
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = sendRecoveryEmail;
