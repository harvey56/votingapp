'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateInput(data) {
	var errors = {};

	if (_validator2.default.isEmpty(data.username)) {
		errors.username = "A username is required";
	};

	if (_validator2.default.isEmpty(data.email)) {
		errors.email = "A valid email is required";
	};

	if (!_validator2.default.isEmail(data.email)) {
		errors.email = "An email is required";
	};

	if (_validator2.default.isEmpty(data.password)) {
		errors.password = "A password is required";
	};

	if (_validator2.default.isEmpty(data.passwordconf)) {
		errors.passwordconf = "A password is required and it has to match previous entry";
	};

	if (!_validator2.default.equals(data.password, data.passwordconf)) {
		errors.passwordconf = "Passwords must match";
	};

	return {
		errors: errors,
		isValid: (0, _isEmpty2.default)(errors)
	};
};

exports.default = validateInput;