const { Router } = require("express");

const { patchRules, postRules, deleteRules } = require("./validation");

const {
  getRecipes,
  postRecipe,
  patchRecipe,
  deleteRecipe,
  getRecipeById,
} = require("../../controllers/recipes");
const { validate } = require("../../utils");

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);

router.post("/", postRules, validate, postRecipe);

router.patch("/:id", patchRules, validate, patchRecipe);

router.delete("/:id", deleteRules, validate, deleteRecipe);

module.exports = router;
