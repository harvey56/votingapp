import React from 'react';
import axios from 'axios';
import {newPoll} from '../../actions/createpoll';
import { connect } from 'react-redux';

class NewPollForm extends React.Component {

	constructor(props){
		super(props);

		this.handleAddNewOption = this.handleAddNewOption.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeOption = this.handleChangeOption.bind(this);
		

		this.state = {
			options: [''],
			pollData: {},
			optionIndex: '',
			polltitle: '',
			polloption1: '',
			polloption2: '',
			polloption: ''
		};

	};

	handleChange(e){
		this.setState({[e.target.name] : e.target.value})
	};

	handleChangeOption(e){		
		let options = this.state.options.slice();
		let optionIdx = e.target.name.substr(-1);
		options[optionIdx] = e.target.value;

		this.setState({
      		options: options
		});
	};

	handleAddNewOption(){
		let { options } = this.state;
		options.push('');
		this.setState({
      		options: options
		});
	};

	handleRemoveOption(idx){
		let { options } = this.state;
		options.splice(idx, 1);
		this.setState({
      		options: options
		});
	};

	handleSubmit(e){
		e.preventDefault();
		let { polloption1, polloption2, options } = this.state;
		//let pollOptions = [polloption1, polloption2].concat(options);
		polloption1 = [polloption1].map( function(option){ return {option: polloption1, vote: 0} } );
		polloption2 = [polloption2].map( function(option){ return {option: polloption2, vote: 0} } );
		options = options.filter(function(el){ return el.length > 0 });
		console.log(options);
		options = options.map( function(option){ return {option: option, vote: 0} } );
		let pollOptions = [polloption1, polloption2].concat(options);

		const flatten = arr => arr.reduce(
		  (acc, val) => acc.concat(
		    Array.isArray(val) ? flatten(val) : val
		  ),
		  []
		);

		const pollData = {
			user: JSON.parse(localStorage.getItem('user')),
			polltitle: this.state.polltitle.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim(),
			pollOptions: flatten(pollOptions)
		}

		this.props.newPollUrl(pollData);
	};

	render() {

		const { options, optionIndex } = this.state;

		const displayNewOption = (
			options.map(
				(el, idx) => {

					let name = "option " + idx;

					return(
						<li key = {idx} className = "input-group">
							<input 
								type = "text" 
								className = "form-control" 
								placeholder = "Add a new poll option here" 
								aria-describedby="basic-addon1"
								name = {name}
								value = { this.state.options[idx] }
								onChange = { this.handleChangeOption } 
							/>
							<span className="input-group-addon" id="basic-addon1">
								<button type="button" className="close" aria-label="Close" onClick = { this.handleRemoveOption.bind(this, idx) }><span aria-hidden="true">&times;</span></button>
							</span>
						</li>
					)
				}
			)
		);

		return (
			<form id = "form">
				<h4>Create a new poll below and with the URL then provided, allow anyone to vote for any of the options given</h4>
				<div className = "form-group">
					<label className = "control-label">Name your poll</label>
					<input 
						type = "text" 
						className = "form-control" 
						placeholder = "Who is your favourite cat ?" 
						name = "polltitle" 
						value = { this.state.polltitle } 
						onChange = { this.handleChange }
					/>
				</div>

				<div className = "form-group">
					<label className = "control-label">List down the poll options</label>
					<li className = "input-group">
						<input 
							type = "text" 
							className = "form-control" 
							placeholder = "Grumpy cat" 
							aria-describedby="basic-addon1"
							name = "polloption1"
							value = { this.state.polloption1 }
							onChange = { this.handleChange }
						/>
						<span className="input-group-addon" id="basic-addon1">
							<button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						</span>
					</li>
					<li className = "input-group">
						<input 
							type = "text" 
							className = "form-control" 
							placeholder = "Garfield" 
							aria-describedby="basic-addon1"
							name = "polloption2"
							value = { this.state.polloption2 }
							onChange = { this.handleChange }
						/>
						<span className="input-group-addon" id="basic-addon1">
							<button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						</span>
					</li>
					{/*the first 2 options are hard coded because there must be at least 2 options to make a poll possible*/}
					{ displayNewOption }
				</div>

				<button type = "button" className = "btn btn-default btn-margin" onClick = { this.handleAddNewOption }>Add more options</button>
				<button type = "submit" className = "btn btn-default" onClick = { this.handleSubmit }>Submit</button>
			</form>
		)
	}
}

export default connect(null, {newPoll})(NewPollForm);