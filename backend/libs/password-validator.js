const passwordValidator = require("password-validator");

var schema = new passwordValidator();

schema.is().min(5)
.is().max(25)
.has().uppercase()
.has().lowercase()
.has().digits();

module.exports = schema.validate.bind(schema);