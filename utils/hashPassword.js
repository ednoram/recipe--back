const bcrypt = require("bcrypt");

const generateSalt = async (rounds) => await bcrypt.genSalt(rounds);

const hashPassword = async (password) => {
  const salt = await generateSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = hashPassword;
