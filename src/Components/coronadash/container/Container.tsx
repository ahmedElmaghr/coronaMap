import * as d3 from "d3";
import React, { Component } from "react";
import { feature } from "topojson-client";
import countries110 from "../../../countries-110m.json";
import { CountryDailyInfo } from "../../../models/CountryDailyInfo";
import DataHelper from "../../../utils/DataHelper.js";
import Panel from "../../panelchart/Panel";
import CoronaMapView from "../mapD3/CoronaMapView";

interface Props {
  covid19: CountryDailyInfo[];
  onMouseMoveOverCountry: any;
  initGlobalStat: any;
}
interface State {
  worldData: [];
  jsonData: {};
  pieOpacity: number;
  panelOpacity: number;
  panelZindex: number;
  panel_X: number;
  panel_Y: number;
  stat: {};
}
class Container extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      worldData: [],
      jsonData: [],
      pieOpacity: 0,
      panelOpacity: 0
    };
  }

  componentDidMount() {
    this.setState({
      worldData: feature(countries110, countries110.objects.countries).features,
      jsonData: countries110
    });
  }

  handleMouseOut = () => {
    this.closePanelDetails();
  }
  
  render() {
    const {
      worldData,
      jsonData,
      panelOpacity
    } = this.state;

    if (Object.keys(jsonData).length != 0 && this.props.covid19) {
      return (
        <div>
          <CoronaMapView
            worldData={worldData}
            jsonData={jsonData}
            closePanel={() => {
              this.closePanelDetails();
            }}
            covid19={this.props.covid19}
            clickOnCountry={d => {
              this.mouseOverCountry(d);
            }}
            handleMouseOut={() => this.handleMouseOut()}
          />
          <Panel
            opacity={panelOpacity}
            zIndex={this.state.panelZindex}
            stat={this.state.stat}
            closePanel={() => {
              this.closePanelDetails();
            }}
            x={this.state.panel_X}
            y={this.state.panel_Y}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  mouseOverCountry = d => {


    let stat = {};
    let covid19 = this.props.covid19;
    if (d) {
      stat = DataHelper.getStatByPays({ name: d.properties.name }, covid19);
    } else {
      stat = DataHelper.getStatByPays({ name: "Morocco" }, covid19);
    }
    let position = this.getPositionPanel();
    this.setState({
      panelOpacity: 0.9,
      panelZindex: 1,
      stat: stat,
      panel_X: position.x,
      panel_Y: position.y
    });
    // this.sendSvgToBackground();
    this.props.onMouseMoveOverCountry(d)
  };

  getPositionPanel = () => {
    let panelStatDim = d3.selectAll("#panelStat").node().getBoundingClientRect();
    let headerDim = d3.selectAll("#header").node().getBoundingClientRect();
    let x = d3.event.pageX - (panelStatDim.width / 2);
    let y = d3.event.pageY - panelStatDim.height - headerDim.height;
    return { x, y }
  }

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
    this.props.initGlobalStat();
  };
}

export default Container;
