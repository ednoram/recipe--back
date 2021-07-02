const {
  hashPassword,
  findUserByEmail,
  sendVerificationEmail,
} = require("../../utils");
const { User } = require("../../models");

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

    const newUser = await new User({ name, email, password: hashedPassword })
      .save()
      .then((res) => res);

    await sendVerificationEmail(newUser, req, res);

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = register;
