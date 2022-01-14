import * as d3 from "d3";
import { Component } from "react";
import DataHelper from "../../utils/DataHelper.js";
import StringUtils from "../../utils/StringUtils.js";
import uihelper from '../../utils/UIHelper';
import "./Region.css";
class Region extends Component {

  componentWillUnmount() {
    d3.selectAll("#markersDeaths,#markersDesease").remove();
    //.attr("visibility", "hidden").style("opacity",0);
  }

  render() {

    const { countries, covid19, context } = this.props;
    this.drawCircles(countries, covid19, context);
    //add zoom
    return "";
  }


  //Create the world map
  drawCircles = (countries, covid19, context) => {
    let markers ;
    if(context.checkZoneDesease){
      markers = d3.selectAll("#markersDesease");
      d3.selectAll("#markersDeaths").attr("visibility", "hidden");
    }
    if(context.checkToggleBTn){
      markers = d3.selectAll("#markersDeaths");
      d3.selectAll("#markersDesease").attr("visibility", "hidden");
    }
    if (markers.empty()) {
      var gGlobal = d3.select("#gWrapper");
      //Draw Medias
      this.drawZoneByContext(gGlobal, countries, covid19, context);
      this.drawDimondPrincess(gGlobal, countries, covid19);
    } 
    // else {
    //   markers.attr("visibility", "visible").style("opacity",1);
    // }
  };

  drawDimondPrincess = (node, countries, covid19) => {
    let dimondPrincess = countries.filter(e => {
      return e.country == "DP";
    });
    let statDP = DataHelper.getStatByPays(
      { name: "Diamond Princess" },
      covid19
    );
  };

  //Add Markers Function
  drawZoneByContext = (node, countries, covid19, context) => {
    let data = DataHelper.constructData(countries, covid19);
    var markers;
    let dataFiltered = this.filterCountriesByContext(data, context);
    if (dataFiltered) {
      markers = node
        .append("g")
        .attr("id", this.getMarkerId(context))
      markers
        .selectAll("circle")
        .data(dataFiltered)
        .enter()
        .append("circle")
        .on("click", (d, i) => {
          this.props.clickOnCircle(d);
        })
        .attr("key", d => `marker-${d.id}`)
        .attr("cx", d => {
          return this.getCx(d);
        })
        .attr("cy", d => {
          return this.getCy(d);
        })
        .attr("r", d => {
          return uihelper.calculateRadius(d, context)/2  + "px";
        })
        .attr("class", this.getClassByContext(context))
        .append("title")
        .text(d => {
          return `country : ${d.data.country} cases : ${d.stat.cases}`;
        });
    }
    return markers;
  };

  getClassByContext = (context)=>{
    if(context.checkToggleBTn){
      return "marker-black"
    }else if(context.checkZoneDesease){
      return "marker-red"
    }
    
  }

  getMarkerId = (context)=>{
    if(context.checkToggleBTn){
      return "markersDeaths"
    }else if(context.checkZoneDesease){
      return "markersDesease"
    }
    
  }

  filterCountriesByContext = (data, context) => {
    let dataFiltered;
    let dataSorted;
    if (context.checkToggleBTn) {
      dataFiltered = data.filter(
        d =>
          d.stat != null &&
          d.stat.TotalDeaths != 0 &&
          d.stat.TotalDeaths != null &&
          d.data.country != "DP"
      );
      dataSorted = dataFiltered.sort((e1, e2) => {
        var totalDeath1Int = parseInt(
          StringUtils.deleteSpecialChar(e1.stat.deaths),
          10
        );
        var totalDeath2Int = parseInt(
          StringUtils.deleteSpecialChar(e2.stat.deaths),
          10
        );
        return totalDeath2Int - totalDeath1Int;
      });
    } else if (context.checkZoneDesease) {
      dataFiltered = data.filter(
        d =>
          d.stat != null &&
          d.stat.ActiveCases != 0 &&
          d.stat.ActiveCases != null &&
          d.data.country != "DP"
      );
      dataSorted = dataFiltered.sort((e1, e2) => {
        var activeCase1Int = parseInt(
          StringUtils.deleteSpecialChar(e1.stat.cases),
          10
        );
        var activeCase2Int = parseInt(
          StringUtils.deleteSpecialChar(e2.stat.cases),
          10
        );
        return activeCase2Int - activeCase1Int;
      });
    }

    return dataSorted;
  };

  getRadius = (d, context) => {

    let cases;
    if (context.checkToggleBTn) {
      cases = StringUtils.deleteSpecialChar(d.stat.deaths);
      return this.getRadiusDeath(cases)
    } else if (context.checkZoneDesease) {
      cases = StringUtils.deleteSpecialChar(d.stat.cases);
      return this.getRadiusCases(cases)
    }
  };
  getRadiusCases = (cases)=>{
    let rayon = 0;
    if (0 <= cases && cases < 1000) {
      let r = (cases / 1000) * 5;
      rayon = r;
    } else if (1000 <= cases && cases < 5000) {
      let r = (cases / 5000) * 10;
      rayon = r;
    } else if (5000 <= cases && cases < 10000) {
      let r = (cases / 10000) * 20;
      rayon = r;
    } else if (10000 <= cases && cases < 60000) {
      let r = (cases / 50000) * 50;
      rayon = r;
    }else if (60000 <= cases && cases < 100000) {
      let r = (cases / 100000) * 60;
      rayon = r;
    }
    
    return rayon < 1 && rayon > 0 ? 2 : rayon;
  }
  
  getRadiusDeath = (cases)=>{
    let rayon = 0;
    if (0 <= cases && cases < 1000) {
      let r = (cases / 1000) * 10;
      rayon = r;
    } else if (1000 <= cases && cases < 2000) {
      let r = (cases / 2000) * 30;
      rayon = r;
    } else if (2000 <= cases && cases < 5000) {
      let r = (cases / 5000) * 40;
      rayon = r;
    } else if (5000 <= cases && cases < 15000) {
      let r = (cases / 5000) * 45;
      rayon = r;
    }
    
    return rayon < 1 && rayon > 0 ? 2 : rayon;
  }
  getCx = d => {
    if (StringUtils.isNotEmpty(d)) {
      var x = d.coordinate.latitude;
      var y = d.coordinate.longitude;

      var coordinate = [x, y];
      return this.projection()(coordinate)[0];
    }
  };

  getCy = d => {
    if (StringUtils.isNotEmpty(d)) {
      var x = d.coordinate.latitude;
      var y = d.coordinate.longitude;
      var coordinate = [x, y];
      return this.projection()(coordinate)[1];
    }
  };

  //get node color
  getNodeColor = (id, media) => {
    var childsCount = media.filter(d => d.id === id).length;
    if (childsCount == 0) {
      return "rgba(65, 131, 215, 1)";
    } else {
      return "rgba(214, 69, 65, 1)";
    }
  };

  //Projection and path calculator
  projection() {
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
  
}

export default Region;
