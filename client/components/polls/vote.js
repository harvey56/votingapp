import React from 'react';
import { connect } from 'react-redux';
import { getPollData } from '../../actions/createpoll';
import MyChart from './myChart';
import { updatePollVotes } from '../../actions/createpoll';

class Poll extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			hasvoted: false,
			selectedOption: "option0"
		}

		this.handleOptionSelection = this.handleOptionSelection.bind(this);
		this.handleValidateVote = this.handleValidateVote.bind(this);
	}

	componentWillMount(){
		this.props.getPollData(this.props.params.userId, this.props.params.polltitle);
	}	

	handleOptionSelection(e){
		this.setState({selectedOption : e.target.value})
	}

	handleValidateVote(e){
		e.preventDefault();
		this.setState({ hasvoted: true });
		this.props.updatePollVotes(this.state.selectedOption, this.props.pollData, this.props.params.userId, this.props.polltitle);		
	}

	render(){
		let pollData = this.props.pollData || [];
		let pollTitle = this.props.polltitle || [];

		console.log(pollData, pollTitle);

		const pollOptionsList = (
			pollData.map( (option, optionId) => {

				return (
					<li className="list-group-item" key = { optionId }>
					    <input 
					    	type = "radio" 
					    	value = {"option" + optionId }
					    	checked = { this.state.selectedOption === "option" + optionId } 
					    	onChange = { this.handleOptionSelection } 
					    	aria-label="..." 
					    />
					    <span> { option.option } </span>
					</li>
				) 				
			})
		)

		return(
			<div>
				{ this.state.hasvoted ? 

				<MyChart />

				:

				<div>
					<div className = "col-md-3 col-md-offset-1">
						<h1><b> { pollTitle } </b></h1><br />
						<h3> by { this.props.params.userId } </h3>
					</div>
					<div className = "col-md-4">
						<ul>
	 						{ pollOptionsList } 
	        			</ul>
	        			<br />
	        			<div className = "text-center">
	        				<button type = "button" className = "btn btn-success" onClick = { this.handleValidateVote }>Vote</button>
	        			</div>
					</div>
				</div>

				}
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		pollData: state.poll.polls,
		polltitle: state.poll.polltitle
	}
}

export default connect(mapStateToProps, { getPollData, updatePollVotes })(Poll);
