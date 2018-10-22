import React, { Component } from 'react';
import './face.css'
class FaceRecognition extends Component {
	
	render() {
		const {url,box}= this.props;
		
		return (
		<div className="center" style={{padding:'5px'}}>

		 <div  style={{position:'relative'}}>
			<img id="inputImage" src={url} alt='' style={{width:'500px', height:'300px'}} />
			<div className='bounding_box' 
			style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow,
				left: box.leftCol}}>
			</div>
         </div>

		</div>

				)}
	}

	export default FaceRecognition;