const { User } = require("../../models");
const { verifyJWT } = require("../../utils");

const uploadImage = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ errors: [{ auth: "Not authorized" }] });
    }

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ errors: [{ user: "User not found" }] });
    }

    const path = req.file.path || "";
    res.status(200).json({ path });
  } catch (err) {
    return res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = uploadImage;
