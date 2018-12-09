const Validator = require('validator');
const isEmpty = require('./empty-validation');

module.exports = function validatePostInput(data) {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	if (!Validator.isLength(data.text, {
			min: 1,
			max: 600
		})) {
		errors.text = 'Post must be between 10 and 600 characters';
   }
   
   if (Validator.isEmpty(data.text)) {
      errors.text = 'huh, share something useful'
   }

	return {
		errors,
		isValid: isEmpty(errors)
	};
};