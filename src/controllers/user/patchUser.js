const { User } = require("@models");

const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = req.user;

    if (String(user._id) !== id) {
      return res
        .status(422)
        .json({ errors: [{ message: "User id or token is invalid" }] });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { name } },
      { returnOriginal: false }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = patchUser;
