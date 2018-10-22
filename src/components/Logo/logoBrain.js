import React, { Component } from 'react';
import Tilt from 'react-tilt';
import icon from './bulb.png';


class LogoBrain extends Component {
	render() {
		return (
			<div style={{display:'flex', justifyContent:'flex-start', padding: '10px', width:'100px'}}>
			<Tilt className="Tilt" options={{ max : 40 }} style={{ height: 100, width: 100 }} >
			<div className="Tilt-inner"> 
<img src={icon} alt="icon loading" />
			</div>
			</Tilt>
			</div>
			)}
	}

	export default LogoBrain;