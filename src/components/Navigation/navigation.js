import React, { Component } from 'react';


class Navigation extends Component {
	render() {

		if(this.props.isSignedIn){
			return (<div style={{display:'flex', justifyContent:'flex-end'}}>
				<div style={{padding:'20px', margin:'0px',
				cursor:'pointer'}}>
				<h4 onClick={()=>this.props.routeChange('signOut')}><u>
				<i className="glyphicon glyphicon-log-out"></i> Sign out</u></h4>
				</div>
				</div> );
			}
			else{
				if(this.props.route === 'signIn'){
					return (
					<div style={{display:'flex', justifyContent:'flex-end'}}>
					<div style={{padding:'20px',
					cursor:'pointer'}}>
					<h4 onClick={()=>this.props.routeChange('register')}><u >Register</u></h4>
					</div>
					</div> 

					);
				}

				else{
					return (
					/* <div></div> */
					<div style={{display:'flex', justifyContent:'flex-end'}}>
					<div style={{padding:'20px',
					cursor:'pointer'}}>
					<h4 onClick={()=>this.props.routeChange('signIn')}><u >Sign in</u></h4>
					</div>
					</div> 

					);
				}
			}
			}
		}

		export default Navigation;