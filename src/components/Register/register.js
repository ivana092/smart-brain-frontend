import React, { Component } from 'react';
import './register.css';
import {EMAIL_BLANK, EMAIL_INVALID, PASSWORD_BLANK, PASSWORD_INSUFFICIENT_LENGTH, NAME_BLANK, MANDATORY_FIELDS_MISSING} from './labels.js';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name : '',
      email : '',
      password : '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      nameErrorMsg:'',
      registerErrMsg: '',
    }
  }

  onNameChange = (event) =>{
    this.setState({name:event.target.value});
  }
  onEmailChange = (event) =>{
    this.setState({email:event.target.value});
  }

  onPasswordChange = (event) =>{
    this.setState({password:event.target.value});
  }

  validateEmail= () => {
    let regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if(this.state.email===''){
     this.setState({emailErrorMsg : EMAIL_BLANK});
   }
   else if(!regex.test(this.state.email)){
     this.setState({emailErrorMsg : EMAIL_INVALID});
   }
   else{
    this.setState({emailErrorMsg:''});
  }
}

validatePassword= () => {
  if(this.state.password===''){
   this.setState({passwordErrorMsg: PASSWORD_BLANK });
 }
 else if(this.state.password.length < 8){
   this.setState({passwordErrorMsg : PASSWORD_INSUFFICIENT_LENGTH});
 }
 else{
  this.setState({passwordErrorMsg:''});
}
}

validateName= () => {
  if(this.state.name===''){
   this.setState({nameErrorMsg : NAME_BLANK});
 }
 else{
  this.setState({nameErrorMsg:''});
}
}

onSubmitRegister = () =>
{
  fetch('https://whispering-tor-15137.herokuapp.com/register',{
    method : 'post',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(
    {
      name : this.state.name,
      email : this.state.email,
      password : this.state.password
    })
  })
  .then(response => response.json())
  .then(user =>{
    console.log("user",user);
    if(user.id){
      this.props.loadUser(user);
      this.props.routeChange('home');
    }
    else{
      // mandatory fields missing json error
      this.setState({registerErrMsg: MANDATORY_FIELDS_MISSING});
    }
  })
}

render() {
	return (

   <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
   <main className="pa4 black-80">
   <div className="measure center">
   <fieldset id="register" className="ba b--transparent ph0 mh0">
   <legend className="f1 center fw7 ph0 mh0">Register</legend>
   <div className="mt3 input-group">
   <label className="db fw6 lh-copy f8 sr-only" htmlFor="name">Name</label>
   <span className="input-group-addon"> <i className="glyphicon glyphicon-user"> </i></span>
   <input onBlur={this.validateName} onChange={this.onNameChange} placeholder="Name"
   className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
   </div>
   {this.state.nameErrorMsg!=='' ?<div>
   <i className="f3 glyphicon glyphicon-exclamation-sign"></i><span className="error">{this.state.nameErrorMsg}</span>
   </div> : ''}
   <br/>
   <div className="mt3 input-group">
   <label className="db fw6 lh-copy f8 sr-only" htmlFor="email-address">Email</label>
   <span className="input-group-addon"> <i className="glyphicon glyphicon-envelope"> </i></span>
   <input onBlur={this.validateEmail}
   onChange={this.onEmailChange} placeholder="Email"
   className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
   </div>
   {this.state.emailErrorMsg!=='' ?<div>
   <i className="f3 glyphicon glyphicon-exclamation-sign"></i><span className="error">{this.state.emailErrorMsg}</span>
   </div> : ''}
   <br/>
   <div className="mv3 input-group">
   <label className="db fw6 lh-copy f8 sr-only" htmlFor="password">Password</label>
   <span className="input-group-addon"> <i className="glyphicon glyphicon-lock"> </i></span>
   <input onBlur={this.validatePassword}
   onChange={this.onPasswordChange} placeholder="Password"
   className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
   </div>
   {this.state.passwordErrorMsg!=='' ?<div>
   <i className="f3 glyphicon glyphicon-exclamation-sign"></i><span className="error">{this.state.passwordErrorMsg}</span>
   </div> : ''}
   </fieldset>
   <br/>
   <div className="">
   <span className="help-block" style={{color:'wheat'}}>By clicking on the button below, you agree to the Cookie Policy.</span>
   <input onClick={this.onSubmitRegister}
   className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f8 dib" type="submit" value="Let's get Started!" />
   </div>
   {this.state.registerErrMsg!=='' ?<div>
   <i className="f3 glyphicon glyphicon-exclamation-sign"></i><span className="error">{this.state.registerErrMsg}</span>
   </div> : ''}
   </div>
   </main>
   </article>

   )}
}

export default Register;