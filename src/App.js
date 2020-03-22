import * as d3 from "d3";
import React, { Component } from "react";
import "./App.css";
import Card from "./Components/card/Card";
import PieChart from "./Components/piechart/PieChart";
import Container from "./coronadash/container/Container";
// import covid19 from "./coronadash/data/covid19.json";
import data from './scrapping/results_coronavirus.csv';

export default class App extends Component {

  constructor(){
    super();
    this.state ={
      dataset : {},
      isLoaded:false
    }
  }
  componentDidMount() {
    d3.csv(data)
      .then((data) =>{
        console.log("data",data)
        this.setState({
          dataset:data,
          isLoaded:true
        })
      })
      .catch((err)=> {
        throw err;
      });
  }

  readData = ()=>{
    d3.csv(data)
    .then((data) =>{
      console.log("data",data)
      this.setState({
        dataset:data
      })
    })
    .catch(function(err) {
      throw err;
    });
    
  }
  render() {
    if(!this.state.isLoaded){
      return ""
    }
    return (
      <div className="container-fluid" style={{ overflow: "auto" }}>
        <div id="header" className="row">
          <div className="header">Corona virus 2019 worldwide</div>
        </div>
        <div className="row">
          <div
            id="leftside"
            className="col-sm-2"
            style={{
              paddingRight: 0 + "px",
              height: window.screen.height + "px"
            }}
          >
            <div className="row">
              <Card covid19={this.state.dataset}></Card>
            </div>
            <div className="row statistics">
              <PieChart
                opacity={1}
                zIndex={1}
                data={this.getPieData(this.getGlobalStat(this.state.dataset))}
                x={85}
                y={100}
              ></PieChart>
            </div>
          </div>
          <div className="col" style={{ height: window.screen.height + "px" }}>
            <div id="mapWW" className="col">
              <Container covid19={this.state.dataset}></Container>
            </div>
          </div>
        </div>
        <div className="footer">
          Last update : 22 March 2020, 12:32 CET
          <br></br>
          <i class="fa fa-github-square" aria-hidden="true"></i>
          <a
            href="https://github.com/ahmedElmaghr/coronaMap.git"
            className="github-link"
            style={{ color: "white" }}
          >
            {" "}
            github repository
          </a>
        </div>
      </div>
    );
  }

  getPieData = data => {
    if (data) {
      return [data.TotalCases, data.TotalRecovered, data.TotalDeaths];
    } else {
      return [0];
    }
  };

  getGlobalStat = data => {
    let totalStatistics;
    if (Array.isArray(data) && data.length) {
      totalStatistics = data[data.length/2 - 1];
    }
    return totalStatistics;
  };
}
