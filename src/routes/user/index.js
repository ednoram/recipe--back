const { Router } = require("express");

const {
  loginRules,
  patchRules,
  deleteRules,
  registerRules,
  sendEmailRules,
  verifyUserRules,
  resetPasswordRules,
  changePasswordRules,
} = require("./validation");

const {
  login,
  register,
  getUsers,
  patchUser,
  deleteUser,
  verifyUser,
  sendRecovery,
  loginWithToken,
  changePassword,
  resetPassword,
  sendVerification,
} = require("@controllers/user");
const { verify, validate } = require("@middleware");

const router = Router();

router.get("/", getUsers);
router.get("/verify", verifyUserRules, validate, verifyUser);

router.post(
  "/reset-password/:email/:token",
  resetPasswordRules,
  validate,
  resetPassword
);
router.post("/login", loginRules, validate, login);
router.post("/login-with-token", verify, loginWithToken);
router.post("/register", registerRules, validate, register);
router.post("/send-recovery", sendEmailRules, validate, sendRecovery);
router.post("/send-verification", sendEmailRules, validate, sendVerification);

router.patch(
  "/:id/password",
  verify,
  changePasswordRules,
  validate,
  changePassword
);
router.patch("/:id", verify, patchRules, validate, patchUser);

router.delete("/:id", verify, deleteRules, validate, deleteUser);

module.exports = router;
