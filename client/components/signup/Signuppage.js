import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { signupUser, signinUser, signoutUser } from '../../actions/userauth';

class Signup extends React.Component{
	render(){
		const { signedupUser } = this.props;
		return(
			<div className = "row">
				<div className = "col-md-4 col-md-offset-4">
					<SignupForm signedupUser = { signupUser } />
				</div>
			</div>
		)
	}
}

Signup.propTypes = {
  signupUser: React.PropTypes.func.isRequired
}

export default connect(null, { signupUser })(Signup);