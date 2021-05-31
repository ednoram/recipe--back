const { Router } = require("express");

const { putRules, postRules, deleteRules } = require("./validation");

const {
  putRecipe,
  getRecipes,
  postRecipe,
  deleteRecipe,
  getRecipeById,
} = require("../../controllers/recipes");
const { validate } = require("../../utils");

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);

router.post("/", postRules, validate, postRecipe);

router.put("/:id", putRules, validate, putRecipe);

router.delete("/:id", deleteRules, validate, deleteRecipe);

module.exports = router;
