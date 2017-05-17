import React from 'react';
import tablet from '../../public/images/tablets300x300.jpg';
import graph from '../../public/images/graph300x300.png';
import pollimg from '../../public/images/polls-header-image.jpg';

class HomepagePics extends React.Component {

render(){
	return(

		<div className = "container-fluid">
						<div className = "row">
							<div className = "col-sm-6 col-md-4">
								<div className = "thumbnail">
									<img src = {pollimg} className = "img-rounded img-responsive" alt = "" />
									<div className = "caption">
										<h2>Make your own polls!</h2>
										<p>Make a poll, vote, share the voting link</p>
									</div>
								</div>
							</div>						
							<div className = "col-sm-6 col-md-4">
								<div className = "thumbnail">
									<img src = {graph} className = "img-rounded img-responsive" alt = "345 width 300 height" />
									<div className = "caption">
										<h2>Live graphs</h2>
										<p>Live graphs show your poll results immediately in an easy to understand format</p>
									</div>
								</div>
							</div>
							<div className = "col-sm-6 col-md-4">
								<div className = "thumbnail">
									<img src = {tablet} className = "img-rounded img-responsive" alt = "" />
									<div className = "caption">
										<h2>Works on all devices</h2>
										<p>The App is responsive. It works on notebooks, tablets and smartphones</p>
									</div>
								</div>
							</div>
						</div>
		</div>

	)
}


}

export default HomepagePics;