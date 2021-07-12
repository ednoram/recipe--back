const { Comment } = require("../../models");

const patchComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const user = req.user;

    const comment = await Comment.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (!comment) {
      return res
        .status(404)
        .json({ errors: [{ message: "Comment not found" }] });
    }

    if (comment.email !== user.email) {
      return res
        .status(401)
        .json({ errors: [{ message: "Comment does not belong to user" }] });
    }

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: id },
      { $set: { message } },
      { returnOriginal: false }
    );

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = patchComment;
