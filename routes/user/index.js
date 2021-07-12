const { Router } = require("express");

const {
  loginRules,
  patchRules,
  deleteRules,
  registerRules,
  sendEmailRules,
  verifyUserRules,
  changePasswordRules,
  favoriteRecipeRules,
  resetPasswordRules,
} = require("./validation");

const {
  login,
  logout,
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
const { verify } = require("../../middleware");

const router = Router();

router.get("/", getUsers);
router.get("/verify", verifyUserRules, validate, verifyUser);

router.post(
  "/favorite-recipes/add",
  verify,
  favoriteRecipeRules,
  validate,
  addFavoriteRecipe
);
router.post(
  "/favorite-recipes/remove",
  verify,
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
router.post("/logout", logout);
router.post("/login-with-token", loginWithToken);
router.post("/login", loginRules, validate, login);
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
