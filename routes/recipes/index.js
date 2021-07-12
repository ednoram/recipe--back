const { Router } = require("express");

const { patchRules, postRules } = require("./validation");

const {
  getRecipes,
  postRecipe,
  patchRecipe,
  deleteRecipe,
  getRecipeById,
} = require("../../controllers/recipes");
const { validate } = require("../../utils");
const { verify } = require("../../middleware");

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);

router.post("/", verify, postRules, validate, postRecipe);

router.patch("/:id", verify, patchRules, validate, patchRecipe);

router.delete("/:id", verify, deleteRecipe);

module.exports = router;
