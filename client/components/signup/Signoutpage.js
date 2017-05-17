import React from 'react';
import {signoutUser} from '../../actions/userauth';
import { connect } from 'react-redux';

class Signout extends React.Component{

	componentWillMount(){
		this.props.signoutUser();
	};

	render(){
		return(
			<div className = "row">
				<div className = "col-md-6 col-md-offset-3 text-center">
					<h2>You just signed out. See you again !</h2>
				</div>
			</div>
		)
	}
}

export default connect(null, { signoutUser })(Signout);