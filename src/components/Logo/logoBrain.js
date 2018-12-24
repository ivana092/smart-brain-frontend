import React, { Component } from 'react';
import Tilt from 'react-tilt';
import icon from './bulb.png';


class LogoBrain extends Component {
	render() {
		return (
			<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" 
			options={{ max : 55 }} style={{ height: 100, width: 100, background: 'linear-gradient(to right, rgba(255, 128, 128, 0.5), rgba(0, 128, 128, 0.3))'}} 
			>
			<div className="Tilt-inner pa3"> 
<img src={icon} alt="bulb icon" />
			</div>
			</Tilt>
			</div>
			)}
	}

	export default LogoBrain;