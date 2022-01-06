import { Button } from "@material-ui/core";
import React, { Component } from "react";
import "./App.css";
import Card from "./Components/card/Card";
import { NextPrevious } from "./Components/nextPrevious/nextPrevious";
import PieChartFullOption from "./Components/pieChart2/PieChartFullOption";
// import PieChart from "./Components/piechart/PieChart";
import Container from "./coronadash/container/Container";
import { getTodayCovidData, getTodayTotalCovidData} from "./Service/covidNinja/NinjaService";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dataset: {},
      totalInfo : {},
      isLoaded: false
    };
    this.clickPrevious = this.clickPrevious.bind(this);
    this.clickNext = this.clickNext.bind(this);
  }
  componentDidMount() {
    let dataset = {}
    getTodayCovidData().then(response =>{
      dataset = response.filter((d)=>{ return d.country !="Western Sahara"})
      getTodayTotalCovidData().then(response =>{
            this.setState({
            dataset,
            totalInfo: response,
            isLoaded: true
          });
      });
    });
   
  }
  
  clickPrevious (){
  }

  clickNext(){
  }

  render() {
    console.log("App render")
    if (!this.state.isLoaded) {
      return "";
    }
    let pieData;
    if(this.state.countryClicked){
      pieData = this.getPieData(this.state.countryClicked);
    }else{
      pieData = this.getPieData(this.getGlobalStat(this.state.dataset));
    }

    return (
      <div
        className="container-fluid"
        style={{ overflow: "auto", height: "1500px" }}
      >
        <div id="header" className="row">
          <div className="header">
           <NextPrevious clickPrevious={this.clickPrevious} clickNext={this.clickNext}/> 
           <div>covid19 worldwide <i className="fa fa-globe" aria-hidden="true"></i></div>
          </div>
        </div>
        <div className="row">
          <div
            id="leftside"
            className="col-2"
            style={{
              paddingRight: 0 + "px",
              height: window.screen.height + "px",
            }}
          >
            <div className="row cards">
              <Card
                covid19={this.state.dataset}
                totalInfo = {this.state.totalInfo}
                countryClicked={this.state.countryClicked}
              ></Card>
            </div>
            <div
              className="row statistics"
              style={{
                overflow: "hidden",
                width: "auto",
                height: "auto",
              }}
            >
              {/* <PieChart
                opacity={1}
                zIndex={1}
                data={this.getGlobalStat(this.state.dataset)}
                countryClicked={this.state.countryClicked}
                // data={this.getPieData(this.getGlobalStat(this.state.dataset))}
                x={85}
                y={100}
              ></PieChart> */}
              <PieChartFullOption 
              data={[
                { title: "total recovered", value: parseInt(pieData[0]), color: "rgb(44, 100, 6)" },
                { title: "total cases", value: parseInt(pieData[1]), color: "rgb(201, 93, 22)" },
                { title: "total deaths", value: parseInt(pieData[2]), color: "rgb(0, 0, 0)" },
              ]}
              countryClicked={this.state.countryClicked}
              />
            </div>
          </div>
          <div
            className="col-10"
            style={{ height: window.screen.height + "px" }}
          >
            <div id="mapWW" className="col">
              <Container
                covid19={this.state.dataset}
                onclick={(d) => this.onclickCountry(d)}
                initGlobalStat={() => {
                  this.initGlobalStat();
                }}
              ></Container>
            </div>
            {/* <TableComponent></TableComponent> */}
          </div>
        </div>
        <div className="footer">
          {/* {lastupdate}
          <br></br> */}
          <i className="fa fa-github-square" aria-hidden="true"></i>
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
        return elt.country =="Morocco";
      })
    }else{
      countryFiltered = dataset.filter((elt)=>{
        return elt.country == d.properties.name;
      })
    }
    this.setState({
      countryClicked : countryFiltered[0]
    })
  }

  getPieData = data => {
    if (data) {
      let totalCases = data.cases;
      let totalRecovered = data.recovered;
      let totalDeaths = data.deaths;
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
        return elt.country == "Morocco";
      })[0];
    }
    return totalStatistics;
  };

  initGlobalStat = ()=>{
    this.setState({
      countryClicked : undefined
    })
  }
}
