import React from 'react';
import classnames from 'classnames';
import validateInput from '../../../server/validation/signup';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/userauth';


class SignupForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordconf: '',
			errors: {}
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({[e.target.name] : e.target.value}) 
	} 

	isValid(){
		const { errors, isValid } = validateInput(this.state);

		if (!isValid){
			this.setState({ errors });
		}

		return isValid;
	}

	handleSubmit(e){
		e.preventDefault();
		if (this.isValid()){
			this.setState({errors: {}});
			this.props.signupUser(this.state).then ( 
				(res) => { 
					console.log("signed up");
				}, 
				(err) => { 
					console.log("err signup: ", err);
					this.setState({ errors: {data: err.response.data.errors} });
				}
			);
		}
	}

	render(){
		const { errors } = this.state;

		return(
			<div>
				<form>
					<h2>Sign up here and start creating cool polls</h2>

					{ errors.data && <div className = "alert alert-danger">{ errors.data }</div> }

					<div className = { classnames("form-group", { "has-error": errors.username }) }>
						<label className = "control-label">User Name</label>
						<input 
							type = "text" 
							className = "form-control" 
							name = "username" 
							value = {this.state.username} 
							onChange = {this.handleChange}
						/>
						{ errors.username && <span className = "help-block">{errors.username}</span> }
					</div>

					<div className = { classnames("form-group", { "has-error": errors.email }) }>
						<label className = "control-label">Email address</label>
						<input 
							type="email" 
							className="form-control" 
							placeholder="Email" 
							name = "email" 
							value = {this.state.email} 
							onChange = {this.handleChange} 
						/>
						{ errors.email && <span className = "help-block">{errors.email}</span> }
					</div>

					<div className = { classnames("form-group", { "has-error": errors.password }) }>
						<label className = "control-label">Password</label>
						<input 
							type="password" 
							className="form-control" 
							placeholder="Password" 
							name = "password" 
							value = {this.state.password} 
							onChange = {this.handleChange} 
						/>
						{ errors.password && <span className = "help-block">{errors.password}</span> }
					</div>

					<div className = { classnames("form-group", { "has-error": errors.passwordconf }) }>
						<label className = "control-label">Password confirmation</label>
						<input 
							type="password" 
							className="form-control" 
							placeholder="Password confirmation" 
							name = "passwordconf" 
							value = {this.state.passwordconf} 
							onChange = {this.handleChange} 
						/>
						{ errors.passwordconf && <span className = "help-block">{errors.passwordconf}</span> }
					</div>
					<button type="submit" className="btn btn-default" onClick = {this.handleSubmit}>Submit</button>
				</form>
			</div>
		)
	}
};



//SignupForm.propTypes = {
//	signupUser: React.PropTypes.func.isRequired
//}

export default connect(null, { signupUser })(SignupForm);