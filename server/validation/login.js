import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateLoginInput(data){
	let errors = {};

	if (Validator.isEmpty(data.username)){
		errors.username = "A username is required";
	};

	if (Validator.isEmpty(data.password)){
		errors.password = "A password is required";
	};

	return{
		errors,
		isValid: isEmpty(errors)
	}
};

export default validateLoginInput;