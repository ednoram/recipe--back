const { Router } = require("express");

const {
  loginRules,
  patchRules,
  deleteRules,
  registerRules,
  loginWithTokenRules,
  changePasswordRules,
} = require("./validation");

const {
  login,
  register,
  getUsers,
  patchUser,
  deleteUser,
  loginWithToken,
  changePassword,
} = require("../../controllers/user");
const { validate } = require("../../utils");

const router = Router();

router.get("/", getUsers);

router.post("/login-with-token", loginWithTokenRules, validate, loginWithToken);
router.post("/login", loginRules, validate, login);
router.post("/register", registerRules, validate, register);

router.patch("/:id", patchRules, validate, patchUser);
router.patch("/:id/password", changePasswordRules, validate, changePassword);

router.delete("/:id", deleteRules, validate, deleteUser);

module.exports = router;
