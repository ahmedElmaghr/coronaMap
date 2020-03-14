import React, { Component } from "react";
import Container from "./MediaFrancais/container/Container";



export default class App extends Component {
  
                 constructor(props) {
                   super(props);                  
                 }
                 
                 shouldComponentUpdate(nextProps,nextState){
                  console.log("shouldComponentUpdate App")
                  console.log("App this props",this.props)
                  console.log("App nextProps",nextProps)
                  return true;
                 }
                 render() { 
                   console.log("App render")
                   return(  
                   <Container></Container>               
                   )
                }                
               } 