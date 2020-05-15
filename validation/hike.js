const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateHikeInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";
    data.title = !isEmpty(data.title) ? data.title : "";
    data.start = !isEmpty(data.start) ? data.start : "";
    data.from = !isEmpty(data.from) ? data.from : "";
    data.arrive = !isEmpty(data.from) ? data.from : "";

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = "Írj legalább 10 karakert, de ne többet mint 300.";
    }

    if (!Validator.isLength(data.title, { min: 5, max: 100 })) {
        errors.title = "Írj legalább 5 karakert, de ne többet mint 100.";
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = "A leírás kitöltése kötelező";
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = "A cím kitöltése kötelező";
    }
    if (Validator.isEmpty(data.start)) {
        errors.start = "Az indulás helyének megadása kötelező";
    }
    if (Validator.isEmpty(data.arrive)) {
        errors.arrive = "Az érkezés helyének megadása kötelező";
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = "Indulási dátum megadása kötelező";
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
