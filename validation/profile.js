const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle min 2 max 4 karakter";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle szükséges";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status mező szükséges";
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Helytelen URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Helytelen URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Helytelen URL";
    }
  }

  if (!isEmpty(data.tiktok)) {
    if (!Validator.isURL(data.tiktok)) {
      errors.tiktok = "Helytelen URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Helytelen URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Helytelen URL";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
