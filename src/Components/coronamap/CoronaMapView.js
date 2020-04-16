import * as d3 from "d3";
import React, { PureComponent } from "react";
import { merge } from "topojson-client";
import StringUtils from "../../Utils/StringUtils";
import "./CoronaMapViewCss.css";
import Legend from "./Legend.js";
import UIHelper from "../../Utils/UIHelper";

export default class CoronaMapView extends PureComponent {
  //Constantes

  // width="100%"
  // height = "100%";
  viewBox = `0 0 800 400`;
  borderColor = "blue";
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("componentWillMount")
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
      .attr("fill", `#F3BABA`)
      .on("click", (d) => {
        console.log("window.pageYOffset",window.pageYOffset)
        this.props.clickOnCountry()
      })
      .append("title")
        .text(d => {
          return "Morocco" ;
        })
  };

  render() {
    return (
      ""
      // <Legend></Legend>
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
          this.props.clickOnCountry(d);
        })
        .append("title")
        .text(d => {
          return d.properties.name ;
        })
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
      return `#C1AEAE`
    }
  }

  //Get country color range rgba(255,255,255)
  getCountryColor = (totalCases) => {

    if (0 < totalCases && totalCases <= 100) {
      return '#FFFFC2'
    } else if (100 <= totalCases && totalCases < 200) {
      return '#E3E363'
    } else if (200 <= totalCases && totalCases < 500) {
      return '#F5CCCC'
    } else if (500 <= totalCases && totalCases < 1000) {
      return '#EB9999'
    } else if (1000 <= totalCases && totalCases < 2000) {
      return '#EB9999'
    } else if (2000 <= totalCases && totalCases < 3000) {
      return '#E47777'
    } else if (3000 <= totalCases && totalCases < 5000) {
      return '#E16666'
    }else if(5000 <= totalCases && totalCases< 10000 ) {
      return '#DA4444'
    }else if(10000 <= totalCases && totalCases< 50000 ) {
      return '#AA2222'
    }
    else if((50000) <= totalCases && totalCases< 100000 ) {
      return '#881B1B'
    }else if(totalCases>100000){
      return '#330A0A'
    }

  }



  //Add zoom
  addZoom = svg => {
    const map = d3.select(".svg");
    const width = map.node().getBoundingClientRect().width;
    const height = width / 3;

    svg.call(d3.zoom()
  //   .filter(function () {
  //     return d3.event.ctrlKey;
  // })
    .scaleExtent([1, 50])
    .translateExtent([[0,0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", () => {
      this.props.closePanel();
      this.zoomed(svg)
    }));
  };

  zoomed = svg => {
    var transform = d3.event.transform;
    svg.selectAll("path,circle").attr("transform", transform);
    var markerRed = d3.selectAll(".marker-red");
    var markersBlack = d3.selectAll(".marker-black");
    let contextDesease = { checkZoneDeaths: false , checkZoneDesease:true}
    markerRed.attr("r", (d)=>{
      let scaledRadius =this.scaleRadius(d,contextDesease,transform.k)
      return (scaledRadius<1 && scaledRadius>0) ? 5 : scaledRadius;
    } )
    let contextDeaths = { checkZoneDeaths: true , checkZoneDesease:false}
    markersBlack.attr("r", (d)=>{
      let scaledRadius =this.scaleRadius(d,contextDeaths,transform.k)
      return (scaledRadius<1 && scaledRadius>0) ? 5 : scaledRadius;
    } )
  // }
  };

  /**
   * d: element data
   * context : the contxt
   * k : scale projection [0,1]
   */
  scaleRadius = (d,context,k)=>{
    let calculatedRadius = UIHelper.calculateRadius(d, context)/4;
    let scaledRadius = k> .5 ? calculatedRadius/k : calculatedRadius
    return scaledRadius + "px";
  }

  //Projection and path calculator
  projection = () =>{
    var geoMercator = d3
      .geoMercator()
      .center([0,-60])
      .scale(80)
      .translate([800 / 2, 650 / 2]);

    var projection2 = d3
      .geoOrthographic()
      .scale(300)
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
