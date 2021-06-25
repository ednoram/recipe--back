const {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} = require("./favoriteRecipes");

exports.login = require("./login");
exports.register = require("./register");
exports.getUsers = require("./getUsers");
exports.patchUser = require("./patchUser");
exports.deleteUser = require("./deleteUser");
exports.loginWithToken = require("./loginWithToken");
exports.changePassword = require("./changePassword");

exports.addFavoriteRecipe = addFavoriteRecipe;
exports.removeFavoriteRecipe = removeFavoriteRecipe;
