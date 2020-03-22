import React, { Component } from "react";
import "./App.css";
import Card from "./Components/card/Card";
import Container from "./MediaFrancais/container/Container";
import covid19 from "./MediaFrancais/data/covid19.json";
import PieChart from "./Components/piechart/PieChart";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("App render");
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
              <Card covid19={covid19}></Card>
            </div>
            <div className="row statistics">
              <PieChart
                opacity={1}
                zIndex={1}
                data={this.getPieData(this.getGlobalStat(covid19.data))}
                x={85}
                y={100}
              ></PieChart>
            </div>
          </div>
          <div className="col" style={{ height: window.screen.height + "px" }}>
            <div id="mapWW" className="col">
              <Container covid19={covid19}></Container>
            </div>
          </div>
        </div>
        <div className="footer">
        Last update : 22 March 2020, 01:46 CET
        <br></br>
        <i class="fa fa-github-square" aria-hidden="true"></i>
          <a href="https://github.com/ahmedElmaghr/coronaMap.git" className="github-link" style={{color : 'white'}}> github repository</a>

        </div>
      </div>
    );
  }

  getPieData = data => {
    console.log("data11",data)
    if (data) {
      return [data.TotalCases,data.TotalRecovered, data.TotalDeaths];
    } else {
      return [0];
    }
  };

  getGlobalStat = (data) =>{
    let totalStatistics;
    if (Array.isArray(data) && data.length) {
      totalStatistics = data[data.length - 1];
    }
    return totalStatistics;
  }
}
