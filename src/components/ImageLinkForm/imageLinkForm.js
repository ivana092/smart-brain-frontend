import React, { Component } from 'react';
import './image.css'

class ImageLinkForm extends Component {
	
	render() {
		const {inputChange , buttonClick} = this.props;
		return (
			<div className="center">
			 <div className="panel panel-info">
                <div className="panel-heading">
                   <h4><p>Check out this amazing face detection app!</p>
                   <p>Just enter the URL of the image in which you want to detect a face and click on Detect button.</p>
                   <p className="text-warning">Note: Make sure image has a .jpg/jpeg, .png, .gif, .tif or .bmp extension</p></h4>
			    </div>
             </div>
			<div className="patternBehind">
			<input type="text" className="input" onChange={inputChange}/>
			<button value="Submit" className="button f8 link dim br3 ph3 pv3 mb2 dib white bg-dark-blue"
			onClick={buttonClick}>Detect</button>
			</div>
			</div>
			)}
	}

	export default ImageLinkForm;