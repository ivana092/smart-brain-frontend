import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/navigation';
import LogoBrain from './components/Logo/logoBrain';
import Rank from './components/Rank/rank';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/register';
import Particles from 'react-particles-js';
import particleJSON from './particlesjs-config.json';

/*const particleOptions={
  particles: {
   number : {
    value : 40,
    density : {
      enable : true,
      value_area: 700
    }
  }
}
}*/

const initialState= {
     imageUrl:'',
     submit:'',
     box:[],
     route:'signIn',
     isSignedIn : false,
     isRegister : false,
     user: {
      id: '',
    name : '',
    email : '',
    entries : 0,
    joined : '',
    imgErrorMsg: ''
     }
   }
const APP_FACE_RECOGNITION_DETECT_ERROR='Unable to detect a face. Please try again with some other picture.'

class App extends Component {

  constructor(){
    super();
    this.state=initialState;
    this.onRouteChange=this.onRouteChange.bind(this);
   
 }

 loadUser = (data)=>{
  this.setState({user:
    {
    id: data.id,
    name : data.name,
    email : data.email,
    entries : data.entries,
    joined : data.joined}
 })
}

  /*componentDidMount(){
fetch('http://localhost:3001')
.then(response=> response.json())
.then(console.log);
}*/

onInputChange= (event) =>{
  this.setState({imageUrl:event.target.value, box:[],imgErrorMsg:''});
}


onButtonSubmit= () =>{
  this.setState({submit:this.state.imageUrl});
  fetch('https://whispering-tor-15137.herokuapp.com/imageUrl',{
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(
      {
        input : this.state.imageUrl
        
      })
    })
  .then(response => response.json())
  /*app.models.predict(Clarifai.FACE_DETECT_MODEL, 
    this.state.imageUrl)*/
  .then(response =>{
    if(response){
      fetch('https://whispering-tor-15137.herokuapp.com/image',{
      method : 'put',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(
      {
        id : this.state.user.id
        
      })
    })
.then(response => response.json())
.then(count =>{
  this.setState(
    Object.assign(this.state.user, {entries : count})
   ) 
}
  )

   .catch(console.log)     
    }
    this.displayFaceBox(this.calculateFaceLocation(response));
  })
  .catch(err => console.error(err));

}

calculateFaceLocation=(data)=>{
  if(data.outputs===undefined || data.outputs[0].data.regions===undefined){
    return this.setState({imgErrorMsg:APP_FACE_RECOGNITION_DETECT_ERROR})
  }
  const boxes= data.outputs[0].data.regions.map(region =>{
  const bounding_box = region.region_info.bounding_box;
  const image  = document.getElementById('inputImage');
  const width = Number(image.width);
  const height =  Number(image.height);
  return{
    leftCol : bounding_box.left_col * width,
    topRow : bounding_box.top_row * height,
    rightCol : width - (bounding_box.right_col * width),
    bottomRow : height - (bounding_box.bottom_row * height)
  }
});
  return boxes;
}

displayFaceBox = (dimensions)=>{
  this.setState({box:dimensions});
}

onRouteChange=(newRoute)=>{
 if(newRoute==='signOut' || newRoute==='register' ||(newRoute==='signIn' && !this.state.isSignedIn)){
  this.setState(Object.assign(initialState,{route:newRoute}));
}
else{
  this.setState({isSignedIn:true, route:newRoute});
}
/*this.setState({route:newRoute});*/
}

render() {
  const {isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
    <Particles className='particles' params={particleJSON} />

    <Navigation isSignedIn={isSignedIn} routeChange={this.onRouteChange} route={route}/>
    {route === 'home' ?
    <div>
    <LogoBrain />
    <Rank userInfo={this.state.user}/>
    <ImageLinkForm error={this.state.imgErrorMsg} inputChange={this.onInputChange} buttonClick={this.onButtonSubmit}/>
    <FaceRecognition url={imageUrl} box={box} error={this.state.imgErrorMsg}/>
    </div>
    : (
      route === 'signIn' || route === 'signOut'
      ? <div className='welcomePage'>
      <SignIn loadUser={this.loadUser} routeChange={this.onRouteChange} />
      </div>
      :<div className='welcomePage'><Register loadUser={this.loadUser} routeChange={this.onRouteChange} /></div>
      )
  }
  </div>
  );
}
}

export default App;
