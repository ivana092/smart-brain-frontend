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

const particleOptions={
  particles: {
   number : {
    value : 30,
    density : {
      enable : true,
      value_area: 800
    }
  }
}
}

const initialState= {
     imageUrl:'',
     submit:'',
     box:{},
     route:'signIn',
     isSignedIn : false,
     isRegister : false,
     user: {
      id: '',
    name : '',
    email : '',
    entries : 0,
    joined : ''
     }
   }

class App extends Component {

  constructor(){
    super();
    this.state=initialState;
   
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
  console.log('loadUser',this.state.user);
}

  /*componentDidMount(){
fetch('http://localhost:3001')
.then(response=> response.json())
.then(console.log);
}*/

onInputChange= (event) =>{
  this.setState({imageUrl:event.target.value});
}


onButtonSubmit= () =>{
  this.setState({submit:this.state.imageUrl},() => {

  });
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
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err => console.error(err));

}

calculateFaceLocation=(data)=>{
  const bounding_box = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image  = document.getElementById('inputImage');
  const width = Number(image.width);
  const height =  Number(image.height);
  console.log(width , height);
  return{
    leftCol : bounding_box.left_col * width,
    topRow : bounding_box.top_row * height,
    rightCol : width - (bounding_box.right_col * width),
    bottomRow : height - (bounding_box.bottom_row * height)
  }
}

displayFaceBox = (dimensions)=>{
  console.log(dimensions);
  this.setState({box:dimensions});
}

onRouteChange=(route)=>{
 console.log(this.state.route);
 if(route==='signOut' || route==='register'){
  this.setState(initialState);
}
else{
  this.setState({isSignedIn:true});
}
this.setState({route:route});
}
render() {
  const {isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
    <Particles className='particles' params={particleOptions} />
    <Navigation isSignedIn={isSignedIn} routeChange={this.onRouteChange}/>
    {route === 'home' ?
    <div>
    <LogoBrain />
    <Rank userInfo={this.state.user}/>
    <ImageLinkForm inputChange={this.onInputChange} buttonClick={this.onButtonSubmit}/>
    <FaceRecognition url={imageUrl} box={box}/>
    </div>
    : (
      route === 'signIn' || route === 'signOut'
      ? <div><SignIn loadUser={this.loadUser} routeChange={this.onRouteChange} /></div>
      :<div><Register loadUser={this.loadUser} routeChange={this.onRouteChange} /></div>
      )
  }
  </div>
  );
}
}

export default App;
