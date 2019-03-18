const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.login = !isEmpty(data.login) ? data.login : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.login)) {
    errors.login = "Login is invalid";
  }

  if (Validator.isEmpty(data.login)) {
    errors.login = "Login feild is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password feild is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};