const { User } = require("../../models");
const { verifyJWT } = require("../../utils");

const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { token, name } = req.body;

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (String(user._id) !== id) {
      return res
        .status(422)
        .json({ errors: [{ message: "User id or token is invalid" }] });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { name } },
      { returnOriginal: false }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = patchUser;
