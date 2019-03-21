const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.planned = !isEmpty(data.planned) ? data.planned : "";

  if (+data.planned.trim() > 168) {
    errors.planned = "Planned hours can not be more than 168";
  }

  if (+data.planned.trim() < 0) {
    errors.planned = "Planned hours can not be less than 0";
  }

  if (!Validator.isFloat(data.planned.trim())) {
    errors.planned = "Planned hours is not a float number";
  }

  if (!Validator.isLength(data.planned.trim(), { min: 1, max: 5 })) {
    errors.planned = "The scheduled hours must be between 1 and 5 characters";
  }

  if (Validator.isEmpty(data.planned)) {
    errors.planned = "Planned feild is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};