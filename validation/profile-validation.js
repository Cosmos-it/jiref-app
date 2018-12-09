const Validator = require('validator');
const isEmpty = require('./empty-validation');

module.exports = function validationProfileInput(data) {
	let errors = {};

	data.me = !isEmpty(data.me) ? data.me : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.skills = !isEmpty(data.skills) ? data.skills : '';

	if (!Validator.isLength(data.me, {
			min: 2,
			max: 40
		})) {
		errors.me = 'Me needs to between 2 and 4 characters';
	}

	if (Validator.isEmpty(data.me)) {
		errors.me = 'Profile me is required';
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = 'Status field is required';
	}

	if (Validator.isEmpty(data.skills)) {
		errors.skills = 'Skills field is required';
	}

	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = 'Not a valid URL';
		}
	}

	if (!isEmpty(data.github)) {
		if (!Validator.isURL(data.github)) {
			errors.github = 'Not a valid URL';
		}
	}

	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = 'Not a valid URL';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};