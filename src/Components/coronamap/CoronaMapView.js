import * as d3 from "d3";
import { PureComponent } from "react";
import { merge } from "topojson-client";
import StringUtils from "../../Utils/StringUtils";
import UIHelper from "../../Utils/UIHelper";
import "./CoronaMapViewCss.css";

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
    if (this.props.jsonData.length != 0) {
      //Draw svg Wrapper
      var svg = this.drawSvgWrapper();
      var gGlobal = svg.append("g").attr("id", "gWrapper");
      //Draw Path from worldData
      var g = this.drawMap(gGlobal, this.props.worldData);
      //Merge morrocan sahara
      this.mergeMorrocanSahara(g);
      //Add text to map
      this.addCountriesName(g, this.props.worldData);
      //add zoom
      var wrapper = d3.select("#content");
      this.addZoom(wrapper);
    }
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
            "Spain",
            "India",
            "Greenland",
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
  mergeMorrocanSahara = (g) => {
    //merge Morocco
    var jsonData = this.props.jsonData;
    //Moroccan Sahara id = 732
    //Morocco id = 504
    var morocco = jsonData.objects.countries.geometries.filter(
      (d) => d.id == 504
    );
    var morrocanSahara = jsonData.objects.countries.geometries.filter(
      (d) => d.id == 732
    );
    var toBeMerged = [morocco[0], morrocanSahara[0]];
    //
    g.append("path")
      .datum(merge(jsonData, toBeMerged))
      .attr("class", "country")
      .attr("id", "morocco")
      .attr("d", (d) => this.calculatePath(d))
      .attr("fill", (d) => {
        return this.markDesease();
      })
      .on("click", (d) => {
        this.props.clickOnCountry();
      });
  };

  render() {
    return "";
    // <Legend></Legend>
  }

  //Draw svg wrapper for map
  drawSvgWrapper() {
    //Construct Body
    var body = d3.select("#mapWW");
    //Construct SVG
    var svg = body
      .append("svg")
      .attr("class", "svg")
      .attr("id", "content")
      .attr("width", this.width)
      .attr("viewBox", this.viewBox);
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
      .attr("d", (d) => this.calculatePath(d))
      .attr("class", "country")
      .attr("fill", (d) => {
        return this.markDesease(d);
      })
      .on("click", (d) => {
        this.props.clickOnCountry(d);
      })
      .append("title")
      .text((d) => {
        return d.properties.name;
      });
    var toDayData = this.props.covid19.todayData;
    var top10CountryNames = toDayData.slice(1, 11).map((d) => {
      return d.Country;
    });
    // g.selectAll(".place-label")
    //   .data(worldData.filter((d)=>{
    //     return ["USA","China","Brazil","Australia","Russia","South Africa","Chile","Mexico","Iran","Germany","Nigeria","Egypt","Spain","India","Greenland"]
    //     .includes(d.properties.name)
    //   }))
    //   .enter()
    //   .append("text")
    //   .attr("class", "place-label")
    //   .attr("x",(d)=>{ return  this.path().centroid(d)[0];})
    //   .attr("y",(d)=>{ return this.path().centroid(d)[1];})
    //   .text((d) => {
    //     return d.properties.name;
    //   });
    return g;
  };

  getCountryCoordinate = (d) => {
    // return [0, 0];
    return [this.getCx(d), this.getCy(d)];
  };

  getCx = (d) => {
    if (StringUtils.isNotEmpty(d)) {
      var x = d.coordinate.latitude;
      var y = d.coordinate.longitude;

      var coordinate = [x, y];
      return this.projection()(coordinate)[0];
    }
  };

  getCy = (d) => {
    if (StringUtils.isNotEmpty(d)) {
      var x = d.coordinate.latitude;
      var y = d.coordinate.longitude;
      var coordinate = [x, y];
      return this.projection()(coordinate)[1];
    }
  };
  //Color land
  markDesease = (d) => {
    let todayData = this.props.covid19.todayData;
    let elt;
    if (d) {
      elt = todayData.filter((e) => {
        let countryTrimmed = e.Country ? e.Country.trim() : "";
        return countryTrimmed == d.properties.name;
      });
    } else {
      //Morocco
      elt = todayData.filter((e) => {
        let countryTrimmed = e.Country ? e.Country.trim() : "";
        return countryTrimmed == "Morocco";
      });
    }
    if (elt[0]) {
      let totalCases = StringUtils.deleteSpecialChar(elt[0].ActiveCases);
      return this.getCountryColor(totalCases);
    } else {
      return `#C1AEAE`;
    }
  };

  //Get country color range rgba(255,255,255)
  getCountryColor = (totalCases) => {
    if (0 == totalCases) {
      return "green";
    }
    if (0 < totalCases && totalCases <= 100) {
      return "#FFFFC2";
    } else if (100 <= totalCases && totalCases < 200) {
      return "#E3E363";
    } else if (200 <= totalCases && totalCases < 1000) {
      return "#cccc59";
    }  else if (1000 <= totalCases && totalCases < 2000) {
      return "#EB9999";
    } else if (2000 <= totalCases && totalCases < 3000) {
      return "#E47777";
    } else if (3000 <= totalCases && totalCases < 5000) {
      return "#E16666";
    } else if (5000 <= totalCases && totalCases < 10000) {
      return "#DA4444";
    } else if (10000 <= totalCases && totalCases < 50000) {
      return "#AA2222";
    } else if (50000 <= totalCases && totalCases < 100000) {
      return "#881B1B";
    } else if (totalCases > 100000) {
      return "#330A0A";
    }
  };

  //Add zoom
  addZoom = (svg) => {
    const map = d3.select(".svg");
    const width = map.node().getBoundingClientRect().width;
    const height = width / 3;

    svg.call(
      d3
        .zoom()
        .scaleExtent([1, 50])
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .extent([
          [0, 0],
          [width, height],
        ])
        .on("zoom", () => {
          this.props.closePanel();
          this.zoomed(svg);
        })
    );
  };

  zoomed = (svg) => {
    var transform = d3.event.transform;
    svg.selectAll("path,circle,.place-label").attr("transform", transform);
    var markerRed = d3.selectAll(".marker-red");
    var markersBlack = d3.selectAll(".marker-black");
    var placeLabel = d3.selectAll(".place-label");

    let contextDesease = { checkZoneDeaths: false, checkZoneDesease: true };
    markerRed.attr("r", (d) => {
      let scaledRadius = this.scaleRadius(d, contextDesease, transform.k);
      return scaledRadius < 1 && scaledRadius > 0 ? 5 : scaledRadius;
    });
    let contextDeaths = { checkZoneDeaths: true, checkZoneDesease: false };
    markersBlack.attr("r", (d) => {
      let scaledRadius = this.scaleRadius(d, contextDeaths, transform.k);
      return scaledRadius < 1 && scaledRadius > 0 ? 5 : scaledRadius;
    });

    //Countries label Transformation
    console.log("k", transform.k);
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
  scaleRadius = (d, context, k) => {
    let calculatedRadius = UIHelper.calculateRadius(d, context) / 4;
    let scaledRadius = k > 0.5 ? calculatedRadius / k : calculatedRadius;
    return scaledRadius + "px";
  };

  //Projection and path calculator
  projection = () => {
    var geoMercator = d3
      .geoMercator()
      .center([0, -60])
      .scale(80)
      .translate([800 / 2, 650 / 2]);

    var projection2 = d3
      .geoOrthographic()
      .scale(150)
      .clipAngle(90)
      .precision(0.1)
      .rotate([0, 0, 0]);
    var projection3 = d3
      .geoConicEqualArea()
      .scale(150)
      .center([0, 33])
      //.translate([width / 2, height / 2])
      .precision(0.3);
    return geoMercator;
  };

  calculatePath = (d) => {
    return this.path()(d);
  };

  path = () => {
    return d3.geoPath().projection(this.projection());
  };
}
