import * as d3 from "d3";
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { feature } from "topojson-client";
import CoronaMapView from "../../Components/coronamap/CoronaMapView";
import Panel from "../../Components/panelchart/Panel";
import countries from "./../data/countries.tsv";
import covid19 from "./../data/covid19.json";
import PieChart from "./../../Components/piechart/PieChart"
import countries110 from "./../../../src/countries-110m.json";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldData: [],
      jsonData: [],
      countries: [],
      covid19: covid19,
      pieVisiblity: "hidden",
      panelOpacity:0

    };
  }


  componentDidMount() {
      let worldData = countries110;

        this.setState({
          worldData: feature(worldData, worldData.objects.countries).features,
          jsonData: worldData
        });


    d3.tsv(countries).then((response, error) => {
      this.setState({
        countries: response
      });
    });
  }

  render() {
    const { worldData, jsonData, countries } = this.state;
    if (jsonData.length != 0) {
      return (
        <div>
          <CoronaMapView
            worldData={worldData}
            jsonData={jsonData}
            closePanel={()=>{this.closePanelDetails()}}
            countries={countries}
            covid19={covid19}
            click={d => {
              this.displayDashBoard(d);
            }}
          ></CoronaMapView>
          <Panel
            opacity={this.state.panelOpacity}
            zIndex={this.state.panelZindex}
            stat={this.state.stat}
            closePanel={()=>{this.closePanelDetails()}}
            x={this.state.x}
            y={this.state.y}
          ></Panel>
            {/* <PieChart
            visibility={this.state.pieVisiblity}
            data={this.getData(this.state.stat)}
            stat={this.state.stat}
            x={50}
            y={50}
          ></PieChart>  */}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  getData = data => {
    if (data) {
      return [data.ActiveCases, data.TotalDeaths, data.TotalRecovered];
    } else {
      return [0];
    }
  };

  displayDashBoard = d => {
    let panelStatDim = d3.selectAll('#panelStat').node().getBoundingClientRect();
    let paneStaWidth =panelStatDim.width;
    let paneStaHeight =panelStatDim.height;
    this.setState({
      panelOpacity:1,
      panelZindex:10,
      stat: d.stat,
      y: d3.event.pageX - (paneStaWidth/2) ,
      x: d3.event.pageY - paneStaHeight
    });
    this.sendSvgToBackground();
  };

  sendSvgToBackground =() =>{
    d3.selectAll("#gWrapper")
    .style("opacity",0.7);
  }

  sendSvgToFrontPage =() =>{
    d3.selectAll("#gWrapper")
    .style("opacity",1);
  }

  closePanelDetails = ()=>{
    this.setState({
      panelOpacity:0,
      panelZindex:-1
    });
    this.sendSvgToFrontPage();
  }

  constructView = () => {
    const { worldData, jsonData, countries } = this.state;
    if (jsonData.length != 0) {
      return (
        <CoronaMapView
          worldData={worldData}
          jsonData={jsonData}
          countries={countries}
        ></CoronaMapView>
      );
    }
    return <div></div>;
  };
}

export default Container;
