import React from 'react';
import { connect } from 'react-redux';
import { retrievePolls, deleteUserPoll } from '../../actions/createpoll';
import { Link } from 'react-router';

class MyPollsList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			polls : []
		}

		this.handleDeletePoll = this.handleDeletePoll.bind(this);
	}

	componentWillMount(){
		//get all polls by connected user from the DB
		this.props.retrievePolls(this.props.params.userId);			
	}

	handleDeletePoll(polltitle){
		this.props.deleteUserPoll(this.props.params.userId, polltitle, this.props.polls)
		.then( 
				(res) => this.props.retrievePolls(this.props.params.userId)
		);
	}

	render(){

		let polls  = this.props.polls || [];

		const listPollsTitles = (
			polls.map( (poll, idx) => {
				let myPollDetails = "/chart/" + this.props.params.userId + "/" + poll.polltitle;

				return (
					<li key = {idx} className = "row-fluid">
					 	<div className="panel-body clearfix">
					    	<Link to = { myPollDetails }>{poll.polltitle}</Link>
					    	<span className="pull-right"><button type="button" className="btn btn-default" onClick = { this.handleDeletePoll.bind(this, poll.polltitle) }>Delete</button></span>
					  	</div>
					</li>				
				)
			})
		)
		
		return(
			<div className = "row">
				<div className = "col-md-6 col-md-offset-3">
					<div className="panel panel-default">
						<div className="panel-heading">You currently have  <span className="badge text-right">{polls.length}</span> polls</div>
						<ul>									
							{ listPollsTitles }
						</ul>
					</div>
				</div>
			</div>
		)}
}

function mapStateToProps(state){
	return {
		user: state.auth.user,
		polls: state.poll.polls
	}
}

export default connect(mapStateToProps, { retrievePolls, deleteUserPoll })(MyPollsList);
