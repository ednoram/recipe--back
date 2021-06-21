const { User } = require("../../models");

const getUsers = (req, res) => {
  try {
    User.find().then((users) => {
      const response = users.map((user) => ({
        name: user.name,
        email: user.email,
      }));

      res.status(200).json(response);
    });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getUsers;
