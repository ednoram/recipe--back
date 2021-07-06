const { Router } = require("express");

const { postRules, deleteRules, patchRules } = require("./validation");

const {
  getComments,
  postComment,
  patchComment,
  deleteComment,
} = require("../../controllers/comments");
const { validate } = require("../../utils");

const router = Router();

router.get("/", getComments);

router.post("/", postRules, validate, postComment);

router.patch("/:id", patchRules, validate, patchComment);

router.delete("/:id", deleteRules, validate, deleteComment);

module.exports = router;
