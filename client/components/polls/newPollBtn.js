import React from 'react';

class NewPollBtn extends React.Component {	

	render(){
		return(
			<button type = "button" className = "btn btn-success btn-margin" onClick = { this.props.handleClick }>New Poll</button>
		)
	}
}

export default NewPollBtn;