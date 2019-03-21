const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.sso.login = !isEmpty(data.sso.login) ? data.sso.login : "";
  data.emailToSubscribe = !isEmpty(data.emailToSubscribe) ? data.emailToSubscribe : "";
  data.expireDate = !isEmpty(data.expireDate) ? data.expireDate : "";

  // SSO

  if (!Validator.isEmail(data.sso.login)) {
    errors.sso.login = "SSO login is invalid";
  }

  if (Validator.isEmpty(data.sso.login)) {
    errors.sso.login = "SSO login feild is required";
  }

  // VPN 

  if (!Validator.matches(data.vpn.login, /^\D[\w]{5,}\_[\w]{3}$/)) {
    errors.vpn.login = "VPN login is invalid";
  }

  if (Validator.isEmpty(data.vpn.login)) {
    errors.vpn.login = "VPN login feild is required";
  }

  // Email

  if (!Validator.isEmail(data.emailToSubscribe)) {
    errors.emailToSubscribe = "Email feild is invalid";
  }

  if (Validator.isEmpty(data.emailToSubscribe)) {
    errors.emailToSubscribe = "Email feild is required";
  }

  // Expire

  if (!Validator.toDate(data.expireDate)) {
    errors.expireDate = "Expire date feild is invalid";
  }

  if (!Validator.isEmpty(data.expireDate)) {
    errors.expireDate = "Expire feild is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};