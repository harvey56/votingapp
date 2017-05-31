import React from 'react';
import { connect } from 'react-redux';
import { retrieveallpolls } from '../../actions/createpoll';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class ViewAllPolls extends React.Component{

	constructor(props){
		super(props);

		this.handleDeletePoll = this.handleDeletePoll.bind(this);
	}

	componentWillMount(){
		this.props.retrieveallpolls();			
	}

	handleDeletePoll(idx){
		this.props.deleteUserPoll(this.props.params.userId, this.props.polls[idx].polltitle);
	}

	render(){

		let polls  = this.props.polls || [];

		const listPollsTitles = (
			polls.map( (poll, idx) => {
				let myPollDetails = "/chart/" + poll.user.username + "/" + poll.polltitle;
				let votingURI = "/poll/" + poll.user.username + "/" + poll.polltitle;

				return (
					<li key = {idx} className = "row-fluid">
					 	<div className="panel-body clearfix">
					    	<Link to = { myPollDetails }>{poll.polltitle}</Link>
					    	<span className="pull-right"><Link to = { votingURI }>Vote</Link></span>
					  	</div>
					</li>				
				)
			})
		)
		
		return(
			<div className = "row">
				<div className = "col-md-6 col-md-offset-3">
					<div className="panel panel-default">
						<div className="panel-heading">There are <span className="badge text-right">{polls.length}</span> polls that have been submitted so far</div>
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
		polls: state.poll.polls
	}
}

export default connect(mapStateToProps, { retrieveallpolls })(ViewAllPolls);