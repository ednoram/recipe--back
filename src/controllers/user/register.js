const { User } = require("@models");
const { hashPassword, sendVerificationEmail } = require("@utils");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({
        errors: [{ message: "User with this email address already exists" }],
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    await sendVerificationEmail(newUser, req, res);

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = register;
