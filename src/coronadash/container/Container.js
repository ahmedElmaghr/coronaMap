import * as d3 from "d3";
import React, { Component } from "react";
import { feature } from "topojson-client";
import CoronaMapView from "../../Components/coronamap/CoronaMapView";
import Panel from "../../Components/panelchart/Panel";
import Region from "../../Components/region/Region";
import ToggleBtn from "../../Components/toggleButton/ToggleBtn";
import DataHelper from "../../Utils/DataHelper.js";
import countries110 from "./../../../src/countries-110m.json";
import countries from "./../data/countries.tsv";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldData: [],
      jsonData: [],
      countries: [],
      pieOpacity: 0,
      panelOpacity: 0,
      checkToggleBTn: false
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
    console.log("call Container render");
    const {
      worldData,
      jsonData,
      countries,
      panelOpacity,
      circleLoaded
    } = this.state;
    const { covid19 } = this.props;
    let region = "";

    if (this.state.checkToggleBTn) {
      region = (
        <Region
          worldData={worldData}
          countries={countries}
          covid19={covid19}
          clickOnCircle={d => {
            this.clickOnCircle(d);
          }}
        />
      );
    }
    if (jsonData.length != 0 && covid19) {
      return (
        <div>
          <CoronaMapView
            worldData={worldData}
            jsonData={jsonData}
            closePanel={() => {
              this.closePanelDetails();
            }}
            countries={countries}
            covid19={covid19}
            clickOnCountry={d => {
              this.clickOnCountry(d);
            }}
          />
          {region}
          <ToggleBtn
            checked={this.state.checkToggleBTn}
            click={() => this.switchToggleBtn()}
          />
          <Panel
            opacity={panelOpacity}
            zIndex={this.state.panelZindex}
            stat={this.state.stat}
            closePanel={() => {
              this.closePanelDetails();
            }}
            x={this.state.x}
            y={this.state.y}
          />

          {/* <PieChart
            opacity={this.state.pieOpacity}
            zIndex = {this.state.pieZindex}
            data={this.getData(this.state.stat)}
            stat={this.state.stat}
            x={50}
            y={50}
          ></PieChart> */}
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

  clickOnCountry = d => {
    

    let stat = {};
    let covid19 = this.props.covid19;
    if (d) {
      stat = DataHelper.getStatByPays({ name: d.properties.name }, covid19);
    } else {
      stat = DataHelper.getStatByPays({ name: "Morocco" }, covid19);
    }
    let position = this.getPositionPanel();
    this.setState({
      panelOpacity: 1,
      panelZindex: 1,
      stat: stat,
      x: position.x,
      y: position.y 
    });
    this.sendSvgToBackground();
  };

  getPositionPanel = ()=>{
    let panelStatDim = d3.selectAll("#panelStat").node().getBoundingClientRect();
    let leftsideDim = d3.selectAll("#leftside").node().getBoundingClientRect();
    let headerDim = d3.selectAll("#header").node().getBoundingClientRect();
    let x = d3.event.pageX - leftsideDim.width - (panelStatDim.width / 2) - 15
    let y = d3.event.pageY - panelStatDim.height -headerDim.height;
    return {x,y}
  }
  clickOnCircle = d => {
    
    let positionPanel = this.getPositionPanel();
    this.setState({
      panelOpacity: 1,
      panelZindex: 10,
      stat: d.stat,
      x: positionPanel.x,
      y: positionPanel.y
    });
    this.sendSvgToBackground();
  };

  sendSvgToBackground = () => {
    d3.selectAll("#worldMap").style("opacity", 0.7);
  };

  sendSvgToFrontPage = () => {
    d3.selectAll("#worldMap").style("opacity", 1);
  };

  closePanelDetails = () => {
    this.setState({
      panelOpacity: 0,
      panelZindex: -1
    });
    this.sendSvgToFrontPage();
  };

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

  switchToggleBtn = () => {
    this.setState(currentState => ({
      checkToggleBTn: !currentState.checkToggleBTn,
      mapopacity: 0.5
    }));

    // d3.selectAll("path").attr("fill","cyan")
  };
}

export default Container;
