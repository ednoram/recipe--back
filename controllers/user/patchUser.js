const { User } = require("../../models");
const { verifyUser, findUserByEmail } = require("../../utils");

const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { token, name } = req.body;

    const { email } = await verifyUser(token, res);
    const user = await findUserByEmail(email);

    if (String(user._id) !== id) {
      return res
        .status(422)
        .json({ errors: [{ message: "User id or token is invalid" }] });
    }

    User.findOneAndUpdate(
      { email },
      { $set: { name } },
      { returnOriginal: false },
      (err, user) => {
        return err
          ? res.status(500).json({ errors: [{ message: err.message }] })
          : res.status(200).json(user);
      }
    );
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = patchUser;
