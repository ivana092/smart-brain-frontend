import React, { Component } from 'react';
import './face.css'
class FaceRecognition extends Component {
	calculateBoxFrames(box){
		return box.map((b,i)=> { 
			return (<div className='bounding_box' key={i}
				style={{top: b.topRow, right: b.rightCol, bottom: b.bottomRow,
					left: b.leftCol}}>
					</div>)}
					);
				}

				render() {
					const {url,box,error}= this.props;
					
					return(

					/*url.length!==0 && Object.keys(box).length===0
					? <div className="progress">
					<div className="progress-bar progress-bar-striped active" role="progressbar"
					aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width:'40%'}}>
					40%
					</div>
					</div>

					: */
					<div className="center" style={{padding:'5px'}}>


					<div  style={{position:'relative'}}>
					{error!==undefined && error!==''?
					<div>
					<div className="alert alert-danger">
					<strong>Warning!</strong>{error}
					</div> 
					</div>
					: ''
				}
				<img id="inputImage" src={url} alt='' style={{width:'500px', height:'300px'}} />
				{ box!==undefined && box.length!==0 ?  
					<div>
					{this.calculateBoxFrames(box)}
					</div>
					: ''}


					</div>
					</div>
					)};
				}

				export default FaceRecognition;