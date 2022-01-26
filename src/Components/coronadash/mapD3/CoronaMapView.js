import * as d3 from "d3";
import React, { PureComponent } from "react";
import { merge } from "topojson-client";
import UIHelper from "../../../utils/UIHelper";
import "./CoronaMapViewCss.css";
import Legend from "./Legend.js";

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
        this.props.clickOnCountry()
      })
  };

   getMoroccoCountryColor = (data) => {
    const moroccoData = data.filter(c => c.country == "Morocco");
    let morrocanTodayCases = moroccoData[0].todayCases;
    return this.getCountryColor(morrocanTodayCases); 
   }

   addCountriesName = (g, worldData) => {
    g.selectAll(".place-label")
      .data(
        worldData.filter((d) => {
          return [
            "Morocco",
            "USA",
            "China",
            "Brazil",
            "Australia",
            "Russia",
            "South Africa",
            "Chile",
            "Mexico",
            "Iran",
            "Germany",
            "Nigeria",
            "Egypt",
            "India",  
            "Greenland",
            "France"
          ].includes(d.properties.name);
        })
      )
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

  render() {
    return (
      <Legend></Legend>
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
      return '#6f8d43'
    } 
    
    /*else if (0 < dailyCase && dailyCase <= 100) {
      return '#71c7ec'
    } else if (100 <= dailyCase && dailyCase < 200) {
      return '#65b3d4'
    } else if (200 <= dailyCase && dailyCase < 500) {
      return '#5a9fbc'
    } else if (500 <= dailyCase && dailyCase < 1000) {
      return '#4f8ba5'
    } else if (1000 <= dailyCase && dailyCase < 5000) {
      return '#43778d'
    } */
    else if (0 < dailyCase && dailyCase <= 2000) {
      return '#71c7ec'
    }
    else if (2000 < dailyCase && dailyCase <= 5000) {
      return '#65b3d4'
    }
    else if (5000 <= dailyCase && dailyCase < 15000) {
      return '#386376'
    } else if (15000 <= dailyCase) {
      return '#16272f'
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
      this.props.closePanel();
      this.zoomed(svg)
    }));
  };

  zoomed = svg => {
    var transform = d3.event.transform;
    svg.selectAll("path,circle,.place-label").attr("transform", transform);
    var markerRed = d3.selectAll(".marker-red");
    var markersBlack = d3.selectAll(".marker-black");
    var placeLabel = d3.selectAll(".place-label");

    let contextDesease = { checkToggleBTn: false , checkZoneDesease:true}
    markerRed.attr("r", (d)=>{
      let scaledRadius =this.scaleRadius(d,contextDesease,transform.k)
      return scaledRadius<5 ? 5 : scaledRadius;
    } )
    let contextDeaths = { checkToggleBTn: true , checkZoneDesease:false}
    markersBlack.attr("r", (d)=>{
      let scaledRadius =this.scaleRadius(d,contextDeaths,transform.k)
      return scaledRadius<5 ? 5 : scaledRadius;
    } );
  //Countries label Transformation
  let k = transform.k;

  if (k >= 1 && k < 2) {
    placeLabel.style("font-size", "10px");
  } else if (k >= 2 && k < 3) {
    placeLabel.style("font-size", "5px");
  } else if (k >= 3 && k < 8) {
    placeLabel.style("font-size", "3px").style("stroke-width", "0.1px");
  } else {
    placeLabel
      .style("font-size", "1px")
      .style("stroke-width", "0px")
      .style("letter-spacing", "0px");
  }

};
  /**
   * d: element data
   * context : the contxt
   * k : scale projection [0,1]
   */
  scaleRadius = (d,context,k)=>{
    let calculatedRadius = UIHelper.calculateRadius(d, context)/2;
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