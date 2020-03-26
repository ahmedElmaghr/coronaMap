import * as d3 from "d3";
import React, { PureComponent } from "react";
import { merge } from "topojson-client";
import "./CoronaMapViewCss.css";
import Legend from "./Legend.js";
import StringUtils from "../../Utils/StringUtils";

export default class CoronaMapView extends PureComponent {
  //Constantes

  width = "100%";
  height = "100%";
  viewBox = `0 0 800 400`;
  borderColor = "blue";
  constructor(props) {
    super(props);
  }

  

  componentWillMount() {
    if (this.props.jsonData.length != 0) {
      //Draw svg Wrapper
      var svg = this.drawSvgWrapper();
      var gGlobal = svg.append("g").attr("id", "gWrapper");
      //Draw Path from worldData
      var g = this.drawMap(gGlobal, this.props.worldData);
      //Merge morrocan sahara
      this.mergeMorrocanSahara(g);
      //
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
      .attr("fill", `#65b3d4`)
      .on("click", (d) => {
        this.props.clickOnCountry()
      })
  };

  render() {
    return (
      <Legend></Legend>
    );
  }

  initMarkersAndLinks = () => {
    d3.selectAll(".markers").remove();
    d3.selectAll(".paths").remove();
  };


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
      // .attr("height", window.screen.height +'px')
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
          this.props.clickOnCountry(d);
        })
      // .on("mouseout",()=>{
      //   this.props.closePanel();
      // })
      return g;

  };

  //Color land 
  markDesease = (d) => {
    let elt = this.props.covid19.filter((e) => {
      let countryTrimmed = e.Country ? e.Country.trim() : "";

      return countryTrimmed == d.properties.name
    })
    if (elt[0]) {
      let totalCases = StringUtils.deleteSpecialChar(elt[0].TotalCases);
      return this.getCountryColor(totalCases);

    } else {
      return `rgba(218, 223, 225, 1)`
    }
  }

  //Get country color range rgba(255,255,255)
  getCountryColor = (totalCases) => {

    if (0 < totalCases && totalCases <= 100) {
      return '#71c7ec'
    } else if (100 <= totalCases && totalCases < 200) {
      return '#65b3d4'
    } else if (200 <= totalCases && totalCases < 500) {
      return '#5a9fbc'
    } else if (500 <= totalCases && totalCases < 1000) {
      return '#4f8ba5'
    } else if (1000 <= totalCases && totalCases < 5000) {
      return '#43778d'
    } else if (5000 <= totalCases && totalCases < 30000) {
      return '#386376'
    } else if (15000 <= totalCases && totalCases < 100000) {
      return '#16272f'
    }

  }



  //Add zoom
  addZoom = svg => {
    svg.call(d3.zoom().on("zoom", () => {
      this.props.closePanel();
      this.zoomed(svg)
    }));
  };

  zoomed = svg => {
    var transform = d3.event.transform;

    svg.selectAll("path,circle").attr("transform", transform);

  };


  //Projection and path calculator
  projection = () =>{
    var geoMercator = d3
      .geoMercator()
      // .center([0,25])
      .scale(200)
      .translate([800 / 2, 650 / 2]);

    var projection2 = d3
      .geoOrthographic()
      .scale(100)
      .precision(0.1);
    var projection3 = d3
      .geoConicEqualArea()
      .scale(150)
      .center([0, 33])
      //.translate([width / 2, height / 2])
      .precision(0.3);
    return geoMercator;
  }

  calculatePath = d => {
    return d3.geoPath().projection(this.projection())(d);
  };
}
