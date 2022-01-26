import * as d3 from "d3";
import React, { Component } from "react";
import { feature } from "topojson-client";
import CoronaMapView from "../mapD3/CoronaMapView";
import Panel from "../../panelchart/Panel";
import Region from "../../region/Region";
import DataHelper from "../../../utils/DataHelper.js";
import countries110 from "../../../countries-110m.json";
import countries from "../data/countries.tsv";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldData: [],
      jsonData: [],
      countries: [],
      pieOpacity: 0,
      panelOpacity: 0,

      context: {
        checkToggleBTn: false,
        checkZoneDesease: false
      }
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
    const {
      worldData,
      jsonData,
      countries,
      panelOpacity,
      context
    } = this.state;
    const { covid19 } = this.props;
    let zoneDeaths = "";

    if (context && (context.checkToggleBTn || context.checkZoneDesease)) {
      zoneDeaths = (
        <Region
          context = {context}
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
          {zoneDeaths}
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
    this.props.onclick(d)
  };

  getPositionPanel = ()=>{
    let panelStatDim = d3.selectAll("#panelStat").node().getBoundingClientRect();
    let headerDim = d3.selectAll("#header").node().getBoundingClientRect();
    let x = d3.event.pageX - (panelStatDim.width / 2) - 15
    let y = d3.event.pageY - panelStatDim.height -headerDim.height;
    return {x,y}
  }

  sendSvgToBackground = () => {
    d3.selectAll("#worldMap").style("opacity", 0.3);
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
    this.props.initGlobalStat();
  };
}

export default Container;