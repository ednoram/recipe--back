const bcrypt = require("bcrypt");

const comparePasswords = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

module.exports = comparePasswords;
