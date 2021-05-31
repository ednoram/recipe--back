const { body } = require("express-validator");

exports.registerRules = [
  body("name").isLength({ min: 1 }).withMessage("Name is required"),
  body("email").isEmail().withMessage("Email address is not valid"),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must contain 8-16 characters"),
  body("passwordConfirmation")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

exports.loginRules = [
  body("email").isEmail().withMessage("Email address is not valid"),
  body("password").isString().withMessage("Password is required"),
];

exports.deleteRules = [
  body("password").isString().withMessage("Password is required"),
];

exports.loginWithTokenRules = [
  body("token").exists().withMessage("Token is required"),
];
