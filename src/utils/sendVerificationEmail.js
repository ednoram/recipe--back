const { nanoid } = require("nanoid");

const { Token } = require("@models");
const { SENDER_EMAIL } = require("@config");
const { mailTransporter, hashPassword } = require("@utils");

const sendVerificationEmail = async (user, req) => {
  const token = nanoid();

  const { email } = user;

  const existingToken = await Token.findOne({ email });

  if (existingToken) {
    await Token.findOneAndDelete({ email });
  }

  const hashedToken = await hashPassword(token);

  await new Token({ email, token: hashedToken }).save();

  const mailSubject = "Verify account - Recipe";
  const verificationURL = `${req.protocol}://${req.get(
    "host"
  )}/api/user/verify?token=${token}&email=${email}`;
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
