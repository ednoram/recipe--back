const { Recipe } = require("../../models");

const getRecipes = (req, res) => {
  try {
    const { email } = req.query;

    if (email) {
      Recipe.find({ email }).then((data) => res.status(200).json(data));
    } else {
      Recipe.find().then((data) => res.status(200).json(data));
    }
  } catch (err) {
    res.status(404).json({ errors: [{ message: err.message }] });
  }
};

module.exports = getRecipes;
