const { Router } = require("express");

const {
  loginRules,
  patchRules,
  deleteRules,
  registerRules,
  sendEmailRules,
  verifyUserRules,
  loginWithTokenRules,
  changePasswordRules,
  favoriteRecipeRules,
  resetPasswordRules,
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
  addFavoriteRecipe,
  removeFavoriteRecipe,
} = require("../../controllers/user");
const { validate } = require("../../utils");

const router = Router();

router.get("/", getUsers);
router.get("/verify", verifyUserRules, validate, verifyUser);

router.post(
  "/favorite-recipes/add",
  favoriteRecipeRules,
  validate,
  addFavoriteRecipe
);
router.post(
  "/favorite-recipes/remove",
  favoriteRecipeRules,
  validate,
  removeFavoriteRecipe
);
router.post(
  "/reset-password/:email/:token",
  resetPasswordRules,
  validate,
  resetPassword
);
router.post("/login", loginRules, validate, login);
router.post("/register", registerRules, validate, register);
router.post("/send-recovery", sendEmailRules, validate, sendRecovery);
router.post("/send-verification", sendEmailRules, validate, sendVerification);
router.post("/login-with-token", loginWithTokenRules, validate, loginWithToken);

router.patch("/:id", patchRules, validate, patchUser);
router.patch("/:id/password", changePasswordRules, validate, changePassword);

router.delete("/:id", deleteRules, validate, deleteUser);

module.exports = router;
