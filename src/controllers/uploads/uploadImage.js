const { User } = require("@models");
const { verifyJWT, cloudUploader } = require("@utils");
const { CLOUDINARY_UPLOAD_FOLDER } = require("@config");

const uploadImage = async (req, res) => {
  try {
    const { token } = req.body;
    const file = req.file;

    if (!token) {
      return res.status(401).json({ errors: [{ auth: "Not authorized" }] });
    }

    if (!file) {
      return res
        .status(422)
        .json({ errors: [{ auth: "File is not provided" }] });
    }

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ errors: [{ user: "User not found" }] });
    }

    const { public_id, secure_url } = await cloudUploader.upload(file.path, {
      folder: CLOUDINARY_UPLOAD_FOLDER,
    });

    res.status(200).json({ imageId: public_id, imageUrl: secure_url });
  } catch (err) {
    return res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = uploadImage;
