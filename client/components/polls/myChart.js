import React from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getPollData } from '../../actions/createpoll';


class MyChart extends React.Component{

	constructor(props){
		super(props);

	}

	componentWillMount(){

		let username = window.location.pathname.split("/")[2];
		let polltitle = window.location.pathname.split("/")[3];

	  	this.props.getPollData(username, polltitle);
	}

  	render() {
		let username = window.location.pathname.split("/")[2];
		let polltitle = this.props.polltitle;  		
  		let pollData = this.props.pollData || [];
	  	let xDataTemp = [];
	  	let yDataTemp = [];  

	  	let votingUrl = "poll/" + username + "/" + polltitle;		

  		const xData = (
			pollData.forEach( (el) => {
				return(
					xDataTemp.push(el.option)
				)
			})  		
  		)

  		const yData = (
			pollData.forEach( (el) => {
				return(
					yDataTemp.push(el.vote)
				)
			}) 
  		)
		
		const data = {
		  labels: xDataTemp,
		  datasets: [
		    {
		      label:  polltitle,
		      backgroundColor: 'rgba(255,99,132,0.2)',
		      borderColor: 'rgba(255,99,132,1)',
		      borderWidth: 1,
		      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		      hoverBorderColor: 'rgba(255,99,132,1)',
		      data: yDataTemp
		    }
		  ]
		};  

		const options = {
	        scales: {
	            xAxes: [{
	                stacked: true
	            }],
	            yAxes: [{
	                stacked: true,
	                ticks: { stepSize: 1 }
	            }]
	        }
	    };
		
    return (

      <div className = "row">
      	<div className = "col-md-6 col-md-offset-3">
	        <h2>{polltitle}</h2>
	        <Bar
	          data={data}
	          width={100}
	          height={50}
	          options={options}
	        />
	    </div>
	    <div className = "cold-md-3">
	    	</br></br>
	    	<h4><Link to = {votingUrl}>I want to vote now !</Link></h4>
	    </div>
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

export default connect(mapStateToProps, { getPollData })(MyChart);