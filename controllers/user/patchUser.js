const { User } = require("../../models");
const { verifyJWT, findUserByEmail } = require("../../utils");

const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { token, name } = req.body;

    const { email } = await verifyJWT(token, res);
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    } else if (!user.isVerified) {
      return res
        .status(500)
        .json({ errors: [{ message: "Account is not verified" }] });
    }

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
