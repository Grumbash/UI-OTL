const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.sso.login = !isEmpty(data.sso.login) ? data.sso.login : "";
  data.emailToSubscribe = !isEmpty(data.emailToSubscribe) ? data.emailToSubscribe : "";
  data.expireDate = !isEmpty(data.expireDate) ? data.expireDate : "";

  if (!Validator.isEmail(data.sso.login)) {
    errors.sso.login = "SSO login is invalid";
  }

  if (Validator.isEmpty(data.sso.login)) {
    errors.sso.login = "SSO login feild is required";
  }

  if (Validator.isEmpty(data.emailToSubscribe)) {
    errors.emailToSubscribe = "Email feild is required";
  }

  if (!Validator.isEmail(data.emailToSubscribe)) {
    errors.emailToSubscribe = "Email feild is invalid";
  }

  if (!Validator.toDate(data.expireDate)) {
    errors.expireDate = "Expire date feild is invalid";
  }

  if (Validator.isEmpty(data.expireDate)) {
    errors.expireDate = "Expire date feild is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};