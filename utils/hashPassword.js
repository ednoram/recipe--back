const bcrypt = require("bcrypt");

const generateSalt = async (rounds) =>
  await bcrypt.genSalt(rounds).then((salt) => {
    return salt;
  });

const hashPassword = async (password) => {
  const salt = await generateSalt(10);

  return await bcrypt.hash(password, salt).then((hash) => {
    return hash;
  });
};

module.exports = hashPassword;
