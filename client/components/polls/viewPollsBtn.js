import React from 'react';

class ViewPollsBtn extends React.Component {

	render(){
		return(
			<button type = "button" className = "btn btn-success btn-margin" onClick = { this.props.handleClick }>View Polls</button>
		)
	}
}

export default ViewPollsBtn;