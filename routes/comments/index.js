const { Router } = require("express");

const { postRules, patchRules } = require("./validation");

const {
  getComments,
  postComment,
  patchComment,
  deleteComment,
} = require("../../controllers/comments");
const { validate } = require("../../utils");
const { verify } = require("../../middleware");

const router = Router();

router.get("/:recipeId", getComments);

router.post("/", verify, postRules, validate, postComment);

router.patch("/:id", verify, patchRules, validate, patchComment);

router.delete("/:id", verify, deleteComment);

module.exports = router;
