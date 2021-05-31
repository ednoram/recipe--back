const { User } = require("../../models");
const { findUserByEmail, hashPassword } = require("../../utils");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await findUserByEmail(email);

    if (user) {
      return res.status(422).json({
        errors: [{ message: "User with this email address already exists" }],
      });
    }

    const hashedPassword = await hashPassword(password);

    new User({ name, email, password: hashedPassword })
      .save()
      .then((user) => res.status(200).json(user));
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = register;
