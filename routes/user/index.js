const { Router } = require("express");

const {
  loginRules,
  patchRules,
  deleteRules,
  registerRules,
  verifyUserRules,
  loginWithTokenRules,
  changePasswordRules,
  favoriteRecipeRules,
  sendVerificationRules,
} = require("./validation");

const {
  login,
  register,
  getUsers,
  patchUser,
  deleteUser,
  verifyUser,
  loginWithToken,
  changePassword,
  sendVerification,
  addFavoriteRecipe,
  removeFavoriteRecipe,
} = require("../../controllers/user");
const { validate } = require("../../utils");

const router = Router();

router.get("/", getUsers);
router.get("/verify", verifyUserRules, validate, verifyUser);

router.post(
  "/send-verification",
  sendVerificationRules,
  validate,
  sendVerification
);
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
router.post("/login", loginRules, validate, login);
router.post("/register", registerRules, validate, register);
router.post("/login-with-token", loginWithTokenRules, validate, loginWithToken);

router.patch("/:id", patchRules, validate, patchUser);
router.patch("/:id/password", changePasswordRules, validate, changePassword);

router.delete("/:id", deleteRules, validate, deleteUser);

module.exports = router;
