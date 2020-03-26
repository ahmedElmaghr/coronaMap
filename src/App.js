import * as d3 from "d3";
import React, { Component } from "react";
import "./App.css";
import Card from "./Components/card/Card";
import PieChart from "./Components/piechart/PieChart";
import Container from "./coronadash/container/Container";
// import covid19 from "./coronadash/data/covid19.json";
import data from "./scrapping/results_coronavirus.csv";
import StringUtils from "./Utils/StringUtils";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dataset: {},
      isLoaded: false
    };
  }
  componentDidMount() {
    d3.csv(data)
      .then(data => {
        this.setState({
          dataset: data,
          isLoaded: true
        });
      })
      .catch(err => {
        throw err;
      });
  }

  readData = () => {
    d3.csv(data)
      .then(data => {
        this.setState({
          dataset: data
        });
      })
      .catch(function(err) {
        throw err;
      });
  };
  render() {
    var currentdate = new Date();
    var lastupdate =
      "Last update: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      ", " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds() +
      " CET";

    // Last update : 22 March 2020, 12:32 CET
    if (!this.state.isLoaded) {
      return "";
    }
    return (
      <div className="container-fluid" style={{ overflow: "auto",height:window.screen.height  }}>
        <div id="header" className="row">
          <div className="header">Corona virus 2019 worldwide</div>
        </div>
        <div className="row">
          <div id="leftside"
            className="col-2"
            style={{
              paddingRight: 0 + "px",
              height: window.screen.height + "px"
            }}
          >
            <div className="row cards">
              <Card covid19={this.state.dataset} countryClicked ={this.state.countryClicked}></Card>
            </div>
            <div
              className="row statistics"
              style={{
                resize: "horizontal",
                overflow: "hidden",
                width: "auto",
                height: "auto"
              }}
            >
              <PieChart
                opacity={1}
                zIndex={1}
                data={this.getGlobalStat(this.state.dataset)}
                countryClicked ={this.state.countryClicked}
                // data={this.getPieData(this.getGlobalStat(this.state.dataset))}
                x={85}
                y={100}
              ></PieChart>
            </div>
          </div>
          <div className="col-10" style={{ height: window.screen.height + "px" }}>
            <div id="mapWW" className="col">
              <Container covid19={this.state.dataset} onclick = {(d)=>this.onclickCountry(d)}></Container>
            </div>
          </div>
        </div>
        <div className="footer">
          {/* {lastupdate}
          <br></br> */}
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

  onclickCountry = (d)=>{
    var dataset = this.state.dataset;
    var countryFiltered;
    if(!d){
      countryFiltered = dataset.filter((elt)=>{
        return elt.Country =="Morocco";
      })
    }else{
      countryFiltered = dataset.filter((elt)=>{
        return elt.Country == d.properties.name;
      })
    }
    console.log(countryFiltered[0]);
    this.setState({
      countryClicked : countryFiltered[0]
    })
  }

  getPieData = data => {
    if (data) {
      let totalCases = StringUtils.deleteSpecialChar(data.TotalCases);
      let totalRecovered = StringUtils.deleteSpecialChar(data.TotalRecovered);
      let totalDeaths = StringUtils.deleteSpecialChar(data.TotalDeaths);
      return [totalRecovered,totalCases, totalDeaths];
    } else {
      return [0];
    }
  };

  getGlobalStat = data => {
    let totalStatistics;
    if (Array.isArray(data) && data.length) {
      //FIXME : refactor this code
      totalStatistics = data.filter(elt => {
        return elt.Country == "Total:";
      })[0];
    }
    return totalStatistics;
  };
}
