import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data){
	let errors = {};

	if (Validator.isEmpty(data.username)){
		errors.username = "A username is required";
	};

	if (Validator.isEmpty(data.email)){
		errors.email = "A valid email is required";
	};

	if(!Validator.isEmail(data.email)){
		errors.email = "An email is required";
	};

	if (Validator.isEmpty(data.password)){
		errors.password = "A password is required";
	};

	if (Validator.isEmpty(data.passwordconf)){
		errors.passwordconf = "A password is required and it has to match previous entry";
	};

	if(!Validator.equals(data.password, data.passwordconf)){
		errors.passwordconf = "Passwords must match";
	};

	return{
		errors,
		isValid: isEmpty(errors)
	}
};

export default validateInput;