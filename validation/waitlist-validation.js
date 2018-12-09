const Validator = require('validator');
const isEmpty = require('./empty-validation');

module.exports = function validateWaitListInput(data) {

   let errors = {};

   data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
   data.email = !isEmpty(data.email) ? data.email : '';

   if (Validator.isEmpty(data.fullname)) {
      errors.fullname = 'Full name field is required';
   }

   if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
   }

   if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
   }
   
   return {
      errors,
      isValid: isEmpty(errors) // this return true or false exist.
   }
   
}