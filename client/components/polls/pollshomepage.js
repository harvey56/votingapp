import React from 'react';
import NewPollBtn from './newPollBtn';
import ViewPollsBtn from './viewPollsBtn';
import NewPollForm from './newPollForm';
import { browserHistory } from 'react-router';
import { newPollUrl } from '../../actions/createpoll';
import { connect } from 'react-redux';
import url from 'url';

class Dashboard extends React.Component {

	constructor(props){
		super(props);

		this.state = {};
		this.handlenewpollClick = this.handlenewpollClick.bind(this);
		this.handleviewpollClick = this.handleviewpollClick.bind(this);
		this.getUrlHost = this.getUrlHost.bind(this);
	}

	handlenewpollClick(){
		browserHistory.push('/addpoll');
	}

	handleviewpollClick(){
		browserHistory.push('/mypolls');
	}

	getUrlHost(){
		url.get("host");
	}

	componentDidMount(){
		this.setState({state: this.state});
	}

	render(){

		const { newPollUrl, pollData, authenticated } = this.props;

		var newPollSubmitted = (
			<div className = "col-md-4 col-md-offset-4">
				<h2>Congratulations! You ve successfully submitted a new poll</h2><br />
				<h4>Your poll is accessible at the following address: </h4><br />
				<p>localhost + "//" + pollData.user.username + "/" + pollData.polltitle</p>
			</div> 		
		);

		const newPollForm = (
			<div className = "col-md-6 col-md-offset-3">
				<NewPollForm newPollUrl = { newPollUrl } />
			</div> 
		);

		return(
			<div>
				<div className = "row mainpageheader">
					<p className = "maintitle">Voting App</p>
					<p className = "second-title">Create custom polls below</p>
				</div>
				{ console.log("authenticated: ", this.props.authenticated )}
				{ 	authenticated && this.props.newPollSubmitted ? 

						<div className = "col-md-6 col-md-offset-3">
							<h2 className = "text-center">Congratulations! You just successfully submitted a new poll</h2><br />
							<h3 className = "text-center">Your poll is accessible at the following address: </h3><br />
							<h3 className = "text-center"><em><a href = { "poll/" + pollData.user.username + "/" + pollData.polltitle }>{window.location.host + "/poll/" + pollData.user.username + "/" + pollData.polltitle}</a></em></h3>
						</div>  

						: 

						newPollForm
				}

			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		newPollSubmitted: state.poll.newPollSubmitted,
		pollData: state.poll.pollData,
		authenticated: state.auth.authenticated
	}
}


export default connect(mapStateToProps, {newPollUrl})(Dashboard);