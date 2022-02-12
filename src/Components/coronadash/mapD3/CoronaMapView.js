import * as d3 from "d3";
import React, { Component, PureComponent } from "react";
import { merge } from "topojson-client";
import withTopologicalData from "../../hoc/withTopologicalData";
import "./CoronaMapViewCss.css";
import Legend from "./Legend.js";
import Panel from "../../panelchart/Panel";
import DataHelper from "../../../utils/DataHelper";

class CoronaMapView extends Component {
  //Constantes

  width = "100%";
  height = "100%";
  viewBox = `0 0 800 400`;
  borderColor = "blue";
  constructor(props) {
    super(props);
    this.state= 
                { panelInfo: 
                  {
                    opacity:0,
                    zIndex:0,
                    stat:{},
                    x:0,
                    y:0
                  } 
                };
  }

  componentDidMount() {
    if (this.props.jsonData.length != 0) {
      //Draw svg Wrapper
      var svg = this.drawSvgWrapper();
      var gGlobal = svg.append("g").attr("id", "gWrapper");
      //Draw Path from worldData
      var g = this.drawMap(gGlobal, this.props.worldData);
      //Merge morrocan sahara
      this.mergeMorrocanSahara(g);
      //country names
      this.addCountriesName(g,this.props.worldData);
      //add zoom
      var wrapper = d3.select("#content");
      this.addZoom(wrapper);
    }
  }

  mergeMorrocanSahara = g => {
    //merge Morocco
    var jsonData = this.props.jsonData;
    //Moroccan Sahara id = 732
    //Morocco id = 504
    var morocco = jsonData.objects.countries.geometries.filter(
      d => d.id == 504
    );
    var morrocanSahara = jsonData.objects.countries.geometries.filter(
      d => d.id == 732
    );
    var toBeMerged = [morocco[0], morrocanSahara[0]];
    //
    g.append("path")
      .datum(merge(jsonData, toBeMerged))
      .attr("class", "country")
      .attr("d", d => this.calculatePath(d))
      .attr("fill", this.getMoroccoCountryColor(this.props.covid19))
      .on("click", (d) => {
        this.clickOnCountry()
      })
  };

   getMoroccoCountryColor = (data) => {
    const moroccoData = data.filter(c => c.country == "Morocco");
    let morrocanTodayCases = moroccoData[0].todayCases;
    return this.getCountryColor(morrocanTodayCases); 
   }

   addCountriesName = (g, worldData) => {
    g.selectAll(".place-label")
      .data(worldData)
      .enter()
      .append("text")
      .attr("class", "place-label")
      .attr("x", (d) => {
        return this.path().centroid(d)[0];
      })
      .attr("y", (d) => {
        return this.path().centroid(d)[1];
      })
      .text((d) => {
        return d.properties.name;
      });
  };

  clickOnCountry = d => {
    let panelStat = {};
    let covid19 = this.props.covid19;
    if (d) {
      panelStat = DataHelper.getStatByPays({ name: d.properties.name }, covid19);
    } else {
      panelStat = DataHelper.getStatByPays({ name: "Morocco" }, covid19);
    }
    let panelPosition = this.getPositionPanel();
    this.setState((prevState) => {
      return {
        panelInfo: {
          opacity: 0.9,
          zIndex: 1,
          stat: panelStat,
          x: panelPosition.x,
          y: panelPosition.y,
        },
      };
    });
  };

  getPositionPanel = () => {
    let panelStatDim = d3.selectAll("#panelStat").node().getBoundingClientRect();
    let headerDim = d3.selectAll("#header").node().getBoundingClientRect();
    let x = d3.event.pageX - (panelStatDim.width / 2);
    let y = d3.event.pageY - panelStatDim.height - headerDim.height;
    return { x, y };
  }
  handleMouseOut = () => {
    this.closePanelDetails();
  }

  closePanelDetails = () => {
    this.setState(prevState =>{
      return {
        panelInfo: {
          ...prevState.panelInfo,
          opacity: 0,
          zIndex: -1,
        },
      }
    });
    this.props.initGlobalStat();
  };

  render() {
    return (
      //map is drew by d3 using id mapWW (map World wide)
      <div id="mapWW" className="col" style={{ height: window.screen.height + "px" }}>
      <Legend/>
      <Panel
            opacity={this.state.panelInfo.opacity}
            zIndex={this.state.panelInfo.zIndex}
            stat={this.state.panelInfo.stat}
            x={this.state.panelInfo.x}
            y={this.state.panelInfo.y}
            closePanel={() => {
              this.closePanelDetails();
            }}
        />
      </div>
    );
  }


  //Draw svg wrapper for map
  drawSvgWrapper() {
    //Construct Body
    var body = d3.select("#mapWW")
    //Construct SVG
    var svg = body
      .append("svg")
      .attr("class", "svg")
      .attr("id", "content")
      .attr("width", this.width)
      .attr("viewBox", this.viewBox)
      ;
    return svg;
  }

  //Draw the world Map
  drawMap = (node, worldData) => {
      var g = node
        .append("g")
        .attr("id", "worldMap")
        .attr("className", "countries");
      g.selectAll("path")
        .data(worldData)
        .enter()
        .append("path")
        .attr("key", (d, i) => `path-${i}`)
        .attr("d", d => this.calculatePath(d))
        .attr("class", "country")
        .attr("fill", (d) => {
          return this.markDesease(d)
        })
        .on("click", (d) => {
          this.clickOnCountry(d);
        })
      return g;

  };

  //Color land 
  markDesease = (d) => {
    let elt = this.props.covid19.filter((e) => {
      let countryTrimmed = e.country ? e.country.trim() : "";

      return countryTrimmed == d.properties.name
    })
    if (elt[0]) {
      let dailyNewCase = elt[0].todayCases;
      return this.getCountryColor(dailyNewCase);

    } else {
      return `rgba(218, 223, 225, 1)`
    }
  }

  //Get country color range rgba(255,255,255)
  getCountryColor = (dailyCase) => {
    if(dailyCase == 0){
      return '#ffedc1'
    } 
    else if (1 <= dailyCase && dailyCase <= 10) {
      return '#95DCF4'
    }
    else if (11 <= dailyCase && dailyCase <= 100) {
      return '#54CBF2'
    }
    else if (101 <= dailyCase && dailyCase < 1000) {
      return '#00ACE3'
    }
    else if (1001 <= dailyCase && dailyCase < 10000) {
      return '#008EBC'
    }
     else if (dailyCase >=10000 ) {
      return '#007092'
    }

  }



  //Add zoom
  addZoom = svg => {
    const map = d3.select(".svg");
    const width = map.node().getBoundingClientRect().width;
    const height = width / 3;

    svg.call(d3.zoom()
    .scaleExtent([1, 50])
    .translateExtent([[0,0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", () => {
      // this.closePanelDetails();
      this.zoomed(svg)
    }));
  };

  zoomed = svg => {
    var transform = d3.event.transform;
    svg.selectAll("path,.place-label").attr("transform", transform);
    var placeLabel = d3.selectAll(".place-label");

  //Countries label Transformation
  let k = transform.k;

  if(k>=7 && k<10){
    placeLabel
    .style("font-size", "2px")
    .style("stroke-width", "0.05px")
    // .style("letter-spacing", "0px")
    .style("visibility","visible");
  }else if(k>=10){
    placeLabel
    .style("font-size", "1px")
    .style("stroke-width", "0.005px")
    // .style("letter-spacing", "0px")
    .style("visibility","visible");
  }
  else{
    placeLabel
    .style("visibility","hidden");
  }

};

  //Projection and path calculator
  projection = () =>{
    var geoMercator = d3
      .geoMercator()
      .center([0,-60])
      .scale(80)
      .translate([800 / 2, 650 / 2]);

    var projection2 = d3
      .geoOrthographic()
      .center([0,-15])
      .scale(190)
      .precision(0.1);
    var projection3 = d3
      .geoConicEqualArea()
      .scale(100)
      .center([0, 150])
      //.translate([width / 2, height / 2])
      .precision(0.3);
    return geoMercator;
  }

  calculatePath = d => {
    return d3.geoPath().projection(this.projection())(d);
  };

  path = () => {
    return d3.geoPath().projection(this.projection());
  };
}
export default withTopologicalData(CoronaMapView);