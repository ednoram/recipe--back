const { createTransport } = require("nodemailer");

const { SENDER_EMAIL, SENDER_PASS } = require("../constants");

const mailTransporter = createTransport({
  service: "yahoo",
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: false,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = mailTransporter;
