import React from 'react';

class SignupBtn extends React.Component{
	render(){
		return(
			<button type = "button" className = "btn btn-success" onClick = { this.props.handleClick }>Sign Up</button>
		)
	}
};

export default SignupBtn;