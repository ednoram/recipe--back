const { User } = require("@models");

const getUsers = async (_req, res) => {
  try {
    const users = await User.find();

    const response = users.map((user) => ({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getUsers;
