const { Router } = require("express");

const { postValidation } = require("./validation");

const {
  getFavoriteRecipes,
  postFavoriteRecipe,
  deleteFavoriteRecipe,
} = require("@controllers/favoriteRecipes");
const { verify, validate } = require("@middleware");

const router = Router();

router.get("/", getFavoriteRecipes);

router.post("/", verify, postValidation, validate, postFavoriteRecipe);

router.delete("/:recipeId", verify, deleteFavoriteRecipe);

module.exports = router;
