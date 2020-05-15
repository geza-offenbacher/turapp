const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Írj legalább 10 karakert, de ne többet mint 300.";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "A mező kitöltése kötelező";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
