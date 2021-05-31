const { User, Recipe } = require("../models");

exports.findUserByEmail = async (email) => {
  return User.findOne({ email }).then((user) => {
    return user;
  });
};

exports.findUserByID = async (id) => {
  return User.findOne({ _id: id }).then((user) => {
    return user;
  });
};

exports.findRecipeByID = async (id) => {
  return Recipe.findOne({ _id: id }).then((recipe) => {
    return recipe;
  });
};
