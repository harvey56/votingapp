import React from 'react';
import { connect } from 'react-redux';
import { retrieveUserLogin } from '../../actions/userauth';
import validateLoginInput from '../../../server/validation/login';
import classnames from 'classnames';
import { browserHistory } from 'react-router';

class LoginForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			errors: {}
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	isValid(){
		const { errors, isValid } = validateLoginInput(this.state);

		if (!isValid){
			this.setState({ errors });
		}
		return isValid;	
	}

	handleChange(e){
		this.setState({[e.target.name] : e.target.value}) 
	} 

	handleSubmit(e){
		e.preventDefault();
		if (this.isValid()){
			this.setState({errors: {}});
			this.props.retrieveUserLogin(this.state).then ( 
				(res) => { browserHistory.push('/'); }, 
				(err) => { this.setState({errors: {"status": err.response.status, "data": err.response.data.errors}}) }
			);
		}
	}

	render(){
		const { errors } = this.state;
		const autherror = this.props.autherror || [];

		return(
			<div>
				<form onSubmit = {this.handleSubmit} >
				<h2>Login here</h2>

					{ errors.status && <div className = "alert alert-danger">{ errors.data }</div> }

					<div className = { classnames("form-group", { "has-error": errors.username }) }>
						<label className = "control-label">User Name</label>
						<input type = "text" className = "form-control" name = "username" value = {this.state.username} onChange = {this.handleChange}/>
						{ errors.username && <span className = "help-block">{errors.username}</span> }
					</div>
					<div className= { classnames("form-group", { "has-error": errors.password }) }>
						<label htmlFor="exampleInputPassword1">Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name = "password" value = {this.state.password} onChange = {this.handleChange} />
						{ errors.password && <span className = "help-block">{errors.password}</span> }
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		)
	}
};

function mapStateToProps(state){
	return {
		autherror: state.auth.error
	}
}

export default connect(mapStateToProps, { retrieveUserLogin })(LoginForm);