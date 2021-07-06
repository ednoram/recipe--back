const { verifyJWT } = require("../../utils");
const { Comment, User } = require("../../models");

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.body;

    const { email } = await verifyJWT(token, res);
    const user = await User.findOne({ email });
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

    const deletedComment = await Comment.findOneAndDelete({ _id: id });

    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = deleteComment;
