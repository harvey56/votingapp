import React from 'react';
import SignupBtn from './signup/SignupBtn';
import HomepagePics from './homepagePics';
import { browserHistory } from 'react-router';

class Main extends React.Component{
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		browserHistory.push('/signup');
	}

	render(){
		return(
			<div>
				<div className = "row mainpageheader">
					<p className = "maintitle">Voting App</p>
					<p className = "second-title">Create custom polls</p>
					<SignupBtn handleClick = { this.handleClick } />
				</div>

				<HomepagePics />
			</div>
		)
	}
}

export default Main;