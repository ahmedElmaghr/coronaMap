import * as d3 from "d3";
import React, { Component } from "react";
import "./App.css";
import Card from "./Components/card/Card";
import PieChart from "./Components/piechart/PieChart";
import Container from "./coronadash/container/Container";
import data from "./scrapping/results_coronavirus.csv";
import StringUtils from "./Utils/StringUtils";
import DateHelper from "./Utils/DateHelper";

export default class App extends Component {
  constructor() {
    super();
    
    this.state = {
      dataset: {},
      isLoaded: false,
    };
  }
  componentDidMount() {
    d3.csv(data)
      .then((data) => {
        this.setState({
          dataset: data.filter((d) => {
            return d.Country != "Western Sahara";
          }),
          isLoaded: true,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  readData = () => {
    d3.csv(data)
      .then((data) => {
        this.setState({
          dataset: data,
        });
      })
      .catch(function (err) {
        throw err;
      });
  };
  render() {
    if (!this.state.isLoaded) {
      return "";
    }

    return (
      <div class="myWrapper">
        <div
          className="container-fluid app-container"
          // style={{
          //   overflow: "auto",
          //   height: window.screen.height + "px",
          // }}
        >
          <div id="header" className="row header-text">
            <h1 className="title1">Mapping the Coronavirus Outbreak</h1>
            <h2 className="title2">
              Get daily updates on the epidemic and learn how it is affecting
              countries around the world.
            </h2>
          </div>
          {/* <div
          id="leftside"
          className="row"
          style={{
            paddingRight: 0 + "px",
          }}
        > */}
          <div className="col cards ">
            <h2 style={{fontFamily:'Arial,sans serif',fontSize:1+'rem',fontWeight:"bold"}}>last update : {this.getUpdatedDate()}</h2>
              <Card
                covid19={this.state.dataset}
                countryClicked={this.state.countryClicked}
              ></Card>
            <h1>Coronavirus map</h1>
            <p>Source:WHO, CDC, NHC via worldometer.</p>
            <div style={{ width: 100 + "%" }}>
              <div className="legend-elt" style={{ color: "#881B1B" }}>
                More than 10,000 cases
              </div>
              <div className="legend-elt" style={{ color: "#EB9999" }}>
              More than 1,000 cases
              </div>
              <div className="legend-elt" style={{ color: "#E3E363" }}>
              Less than 100 cases
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="row">
            <div id="mapWW" className="col " style={{ top: 15 + "%" }}>
              <Container
                covid19={this.state.dataset}
                onclick={(d) => this.onclickCountry(d)}
                initGlobalStat={() => {
                  this.initGlobalStat();
                }}
              ></Container>
            </div>
            {/* <div >
          <PieChart
                opacity={1}
                zIndex={1}
                data={this.getGlobalStat(this.state.dataset)}
                countryClicked={this.state.countryClicked}
                // data={this.getPieData(this.getGlobalStat(this.state.dataset))}
                x={85}
                y={100}
              ></PieChart>
          </div> */}
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
      </div>
    );
  }
  getUpdatedDate = ()=>{
    "MARCH 4, 2020, 1:00 AM"
    var today = new Date();
    var dd = today.getUTCDate();
    var mounth = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    var mm2 = 30;
    if(0<= today.getUTCMinutes() && today.getUTCMinutes()< 30 ){
        mm2 = 0;
    }
    var hours =today.getHours();
    var ampm = hours >= 12 ? 'pm' : 'AM';
    var time =String(hours).padStart(2,'0') +":"+ String(mm2).padStart(2,'0')+' '+ampm;
    today = DateHelper.MONTHS(mounth) + " " + dd + ',' + yyyy+' '+time;
    return today;
  }
  onclickCountry = (d) => {
    var dataset = this.state.dataset;
    var countryFiltered;
    if (!d) {
      countryFiltered = dataset.filter((elt) => {
        return elt.Country == "Morocco";
      });
    } else {
      countryFiltered = dataset.filter((elt) => {
        return elt.Country == d.properties.name;
      });
    }
    this.setState({
      countryClicked: countryFiltered[0],
    });
  };

  getPieData = (data) => {
    if (data) {
      let totalCases = StringUtils.deleteSpecialChar(data.TotalCases);
      let totalRecovered = StringUtils.deleteSpecialChar(data.TotalRecovered);
      let totalDeaths = StringUtils.deleteSpecialChar(data.TotalDeaths);
      return [totalRecovered, totalCases, totalDeaths];
    } else {
      return [0];
    }
  };

  getGlobalStat = (data) => {
    let totalStatistics;
    if (Array.isArray(data) && data.length) {
      //FIXME : refactor this code
      totalStatistics = data.filter((elt) => {
        return elt.Country == "World";
      })[0];
    }
    return totalStatistics;
  };

  initGlobalStat = () => {
    this.setState({
      countryClicked: undefined,
    });
  };
}
