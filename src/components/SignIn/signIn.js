import React, { Component } from 'react';
import icon from './icons8-facial-recognition.png';
import './signIn.css';
import {EMAIL_BLANK, EMAIL_INVALID, PASSWORD_BLANK} from './labels.js';

class SignIn extends Component {
	
  constructor(props){
    super(props);
    this.state = {
      signInEmail : '',
      signInPwd : '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      submitErrorMsg: '',
    }
  }

  onEmailChange = (event) =>{
    this.setState({signInEmail:event.target.value});
  }

  onPasswordChange = (event) =>{
    this.setState({signInPwd:event.target.value});
  }

  checkButton = () =>{
    const button=document.getElementById("signInButton");
    if(this.state.signInEmail==='' && this.state.signInPwd===''){
    button.disabled=true;
   }
   else{
    button.disabled=true;
   }
 }

  validateEmail= () => {
    this.setState({submitErrorMsg:''}); //added to remove submit button error msg on submitting invalid credentials
    let regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    /*
     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; */

    if(this.state.signInEmail===''){
     this.setState({emailErrorMsg:EMAIL_BLANK});
    }
    else if(!regex.test(this.state.signInEmail)){
     this.setState({emailErrorMsg:EMAIL_INVALID});
    }
    else{
      this.setState({emailErrorMsg:''});
    }
  }

  validatePassword= () => {
    this.setState({submitErrorMsg:''});
    if(this.state.signInPwd===''){
     this.setState({passwordErrorMsg:PASSWORD_BLANK});
    }
    else{
      this.setState({passwordErrorMsg:''});
    }
  }
  
  onSubmitSignIn = () =>
  {
    this.validateEmail();
    fetch('https://whispering-tor-15137.herokuapp.com/signIn',{
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(
      {
        email : this.state.signInEmail,
        password : this.state.signInPwd
      })
    })
    .then(response => response.json())
    .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.routeChange('home');
        }
        else{
          this.setState({submitErrorMsg:user});
        }
      }
      )
    }

	render() {
		return (
		
<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-52-m w-25-l mw6 shadow-5 center">
 <main className="pa4 black-80 ma3">
 <img src={icon} className="img-rounded bg-transparent w-30" alt="logo"/>
  <br/> <br/>
  <div className="measure f3">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 center fw7 ph0 mh0">Sign In</legend>
      
      <div className="mt3 input-group">
        
        <label className="db fw6 lh-copy f8 sr-only" htmlFor="email-address">Email</label>
        <span className="input-group-addon"> <i className="f3 glyphicon glyphicon-envelope"> </i></span>
        <input onBlur={this.validateEmail}
        onChange={this.onEmailChange} placeholder="Email" 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100
        " type="email" name="email-address"  id="email-address" />
      </div>
      {this.state.emailErrorMsg!=='' ?<div>
      <i className="f3 glyphicon glyphicon-exclamation-sign"></i><span className="error">{this.state.emailErrorMsg}</span>
      </div> : ''}
       <br/>
      <div className="mv3 input-group">
        <label className="db fw6 lh-copy f8 sr-only" htmlFor="password" >Password</label>
        <span className="input-group-addon"> <i className="f3 glyphicon glyphicon-lock"> </i></span>
        <input onBlur={this.validatePassword}
        onChange={this.onPasswordChange} placeholder="Password"
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
      {this.state.passwordErrorMsg!=='' ?
      <div>
      <i className="f3 glyphicon glyphicon-exclamation-sign"></i>
      <span className="error">{this.state.passwordErrorMsg}</span>
      </div> 
      : ''}
    </fieldset>
    <br/>
    <div className="">
      <input onClick={this.onSubmitSignIn} id="signInButton"
      className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f8 dib" type="submit" value="Sign in" />
    </div>
    {this.state.submitErrorMsg!=='' ?
    <div>
    <i className="f3 glyphicon glyphicon-exclamation-sign"></i>
    <span className="error">{this.state.submitErrorMsg}</span> 
    </div>
    : ''}
    <div className="lh-copy mt3">
      <p onClick={()=>this.props.routeChange('register')} className="f8 link dim black db pointer">Register</p>
    </div>
  </div>
</main>
</article>

				)}
	}

	export default SignIn;