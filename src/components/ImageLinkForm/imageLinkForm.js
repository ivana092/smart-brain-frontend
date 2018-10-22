import React, { Component } from 'react';
import './image.css'

class ImageLinkForm extends Component {
	
	render() {
		const {inputChange , buttonClick} = this.props;
		return (
			<div className="center">
			<h3><p>Check out this amazing face detection app</p></h3>

			<div className="pattern">
			<input type="text" className="input" onChange={inputChange}/>
			<button className="button" value="Submit"
			onClick={buttonClick}>Submit</button>
			</div>

			</div>
			)}
	}

	export default ImageLinkForm;