const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "A név min 2 max 30 karakter";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Név mező kitöltése kötelező";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email mező kitöltése kötelező";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email helytelen";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Jelszó mező kitöltése kötelező";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Jelszó legalább 6 karakter ";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Jelszó ellenőrző mező kitöltése kötelező";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Jelszavaknak egyezni kell";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
