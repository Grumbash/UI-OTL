const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.planned = !isEmpty(data.planned) ? data.planned : "";

  if (!Validator.isInt(data.planned)) {
    errors.planned = "Planned hours is not intager";
  }
  if (!Validator.isLength(data.planned, { min: 1, max: 3 })) {
    errors.planned = "The scheduled hours must be between 1 and 3 characters";
  }

  if (Validator.isEmpty(data.planned)) {
    errors.planned = "Planned feild is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};