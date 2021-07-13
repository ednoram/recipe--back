const { Router } = require("express");

const { postValidation } = require("./validation");

const { validate } = require("../../utils");
const { verify } = require("../../middleware");
const {
  getFavoriteRecipes,
  postFavoriteRecipe,
  deleteFavoriteRecipe,
} = require("../../controllers/favoriteRecipes");

const router = Router();

router.get("/", verify, getFavoriteRecipes);

router.post("/", verify, postValidation, validate, postFavoriteRecipe);

router.delete("/:recipeId", verify, deleteFavoriteRecipe);

module.exports = router;
