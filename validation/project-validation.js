const Validator = require('validator');
const isEmpty = require('./empty-validation');


module.exports = function validateProjectInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.githubproject = !isEmpty(data.githubproject) ? data.githubproject : '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.timetaken = !isEmpty(data.timetaken) ? data.timetaken : '';

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Project name is required';
	}

	if (Validator.isEmpty(data.githubproject)) {
		errors.githubproject = 'Project link is required';
	}

	if (Validator.isEmpty(data.description)) {
		errors.description = 'Project description required';
	}

	if (Validator.isEmpty(data.timetaken)) {
		errors.timetaken = 'Time taken required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};