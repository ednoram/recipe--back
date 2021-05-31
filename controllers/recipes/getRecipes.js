const { Recipe } = require("../../models");

const getRecipes = (_req, res) => {
  Recipe.find()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({ errors: [{ message: err.message }] })
    );
};

module.exports = getRecipes;
