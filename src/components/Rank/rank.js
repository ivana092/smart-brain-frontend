import React, { Component } from 'react';


class Rank extends Component {
	render() {
		const {name,entries} = this.props.userInfo;
		return (
			
			<div className="center" style={{color:'white'}} >

			<h3 ><em>{`${name}, your image detection rank is`}</em></h3><br/>
            <span className="badge"><h2>{`# ${entries}`}</h2></span>
            <br/>
			</div>

			
			)}
	}

	export default Rank;