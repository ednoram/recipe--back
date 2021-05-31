const { Router } = require("express");

const {
  loginRules,
  deleteRules,
  registerRules,
  loginWithTokenRules,
} = require("./validation");

const {
  login,
  register,
  deleteUser,
  loginWithToken,
} = require("../../controllers/user");
const { validate } = require("../../utils");

const router = Router();

router.post("/login-with-token", loginWithTokenRules, validate, loginWithToken);
router.post("/login", loginRules, validate, login);
router.post("/register", registerRules, validate, register);

router.delete("/:id", deleteRules, validate, deleteUser);

module.exports = router;
