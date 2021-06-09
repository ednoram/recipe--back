const uploadImage = async (req, res) => {
  try {
    const path = req.file.path || "";
    res.status(200).json({ path });
  } catch (err) {
    return res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = uploadImage;
