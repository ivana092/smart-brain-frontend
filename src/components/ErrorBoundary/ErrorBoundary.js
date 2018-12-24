import React, {Component} from 'react';

class ErrorBoundary extends Component{
	constructor(props){
       super();
       this.state ={
       	hasError : false
       }
	}
	componentDidCatch(error,info){
		console.log("CAUGHT!!!!!1#####")
       this.setState({hasError:true});
	}

	render(){
		if(this.state.hasError){
			return <h1>OOPS!Something went wrong</h1>
		}else{
			return (this.props.children);
		}
		
	}
}
export default ErrorBoundary;