import React, { Component } from 'react';


class Rank extends Component {
	render() {
		const {name,entries} = this.props.userInfo;
		return (
			<div className="center">
			<div className="center" style={{color:'white'}} >
			<h2 ><em>{`${name}, your current rank is`}</em></h2><br/>
            <h1>{`# ${entries}`}</h1>
			</div>

			</div>
			)}
	}

	export default Rank;