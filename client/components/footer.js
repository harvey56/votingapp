import React from 'react';

class Footer extends React.Component {
	render(){
		return(
			<footer className = "footer">
				<div className = "container text-center text-muted">
					This app was built using ReactJS, Redux, mongodB, and ChartJS for the charts. It is hosted on Heroku. All the code is available on <a href = "https://github.com/harvey56/votingapp">my github</a> 
				</div>
			</footer>
		)
	}
}

export default Footer;