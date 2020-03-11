import * as d3 from "d3";
import React, { PureComponent } from "react";
import { merge } from "topojson-client";
import DataHelper from "../../Utils/DataHelper.js";
import { StringUtils } from "../../Utils/StringUtils.js";
import "./CoronaMapViewCss.css";

export default class CoronaMapView extends PureComponent {
  //Constantes

  width = "100%";
  height = "100%";
  viewBox = `0 0 800 350`;
  borderColor = "blue";

  constructor(props) {
    super(props);
    this.state = {
      medias_francais: [],
      isMapLoaded: false
    };
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
    console.log("toBeMerged", toBeMerged)
    //
    g.append("path")
      .datum(merge(jsonData, toBeMerged))
      .attr("class", "country")
      .attr("d", d => this.calculatePath(d))
      .attr("fill", `rgb(218, 218, 97)`)
      .on("click", (d) => {
        console.log("Welcome to morocco <3", d)
        this.props.clickOnCountry()
      })
  };

  render() {
    const { worldData, regionVisible, countries, covid19 } = this.props;
    this.initMarkersAndLinks();
    if (worldData.length > 0 && regionVisible) {
      this.drawCircles(countries, covid19);
    }
    return <div></div>;
  }

  initMarkersAndLinks = () => {
    d3.selectAll(".markers").remove();
    d3.selectAll(".paths").remove();
  };

  //Create the world map
  drawCircles = (countries, covid19) => {
    var gGlobal = d3.selectAll("#gWrapper");
    //Draw Medias
    this.drawZoneDesease(gGlobal, countries, covid19);
    this.drawDimondPrincess(gGlobal, countries, covid19);
    //add zoom
    // this.addZoom(gGlobal);
  };

  //Draw svg wrapper for map
  drawSvgWrapper() {
    //Construct Body
    var body = d3.select("#root")

    //Construct SVG
    var svg = body
      .append("div")
      .append("svg")
      .attr("class", "svg")
      .attr("id", "content")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("viewBox", this.viewBox)
      .attr(
        "transform",
        "translate(" +
        this.width / 2 +
        "," +
        this.height / 2 +
        ")"
      )
      ;
    //Draw G for map
    return svg;
  }

  //Draw the world Map
  drawMap = (node, worldData) => {
    if (!this.state.isMapLoaded) {
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
    }

  };

  //Color land 
  markDesease = (d) => {
    let elt = this.props.covid19.data.filter((e) => {
      let countryTrimmed = e.Country ? e.Country.trim() : "";

      return countryTrimmed == d.properties.name
    })
    if (elt[0]) {
      let totalCases = elt[0].TotalCases;
      return this.getCountryColor(totalCases);

    } else {
      return `rgba(218, 223, 225, 1)`
    }
  }

  //Get country color range rgba(255,255,255)
  getCountryColor = (totalCases) => {

    if (0 < totalCases && totalCases <= 100) {
      return 'rgb(218, 218, 97)'
    } else if (100 <= totalCases && totalCases < 200) {
      return 'rgb(211, 167, 101)'
    } else if (200 <= totalCases && totalCases < 500) {
      return 'rgb(192, 143, 69)'
    } else if (500 <= totalCases && totalCases < 1000) {
      return 'rgb(206, 130, 80)'
    } else if (1000 <= totalCases && totalCases < 5000) {
      return 'rgb(187, 111, 61)'
    } else if (5000 <= totalCases && totalCases < 15000) {
      return 'rgb(150, 51, 51)'
    } else if (15000 <= totalCases && totalCases < 100000) {
      return 'rgb(145, 10, 10)'
    }

  }

  drawDimondPrincess = (node, countries, covid19) => {
    let dimondPrincess = countries.filter((e) => { return e.country == "DP" });
    let statDP = DataHelper.getStatByPays({ name: "Diamond Princess" }, covid19);
    console.log("dimondPrincess", dimondPrincess)
    console.log("statDP", statDP)

  }

  //Add Markers Function
  drawZoneDesease = (node, countries, covid19) => {
    let data = DataHelper.constructData(countries, covid19);
    var markers = node.append("g")
      .attr("id", "markers")
      .attr("class", "markers");
    let dataFiltered = this.filterCountriesByDesease(data);
    markers
      .selectAll("circle")
      .data(dataFiltered)
      .enter()
      .append("circle")
      .on('click', (d, i) => {
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
        return this.getRadius(d);

      })
      .attr("class", "marker")
      .append("title")
      .text((d) => { return `country : ${d.data.name} cases : ${d.stat.TotalCases}` })

    return markers;
  };

  filterCountriesByDesease = (data) => {
    let dataFiltered = data.filter(d =>
      (d.stat != 0 && d.stat.TotalCases != 0)
      && (d.data.country != "DP")
    )
    dataFiltered.sort((e1, e2) => {
      return e2.stat.TotalCases - e1.stat.TotalCases
    })
    return dataFiltered;
  }

  getRadius = (d) => {
    let rayon = 0;
    let cases = d.stat.TotalCases;
    if (0 < cases && cases <= 100) {
      let r = (cases / 100) * 4
      rayon = r;
    } else if (100 <= cases && cases < 200) {
      let r = (cases / 200) * 5
      rayon = r;
    } else if (200 <= cases && cases < 500) {
      let r = (cases / 500) * 7
      rayon = r;
    } else if (500 <= cases && cases < 2000) {
      let r = (cases / 2000) * 17
      rayon = r;
    } else if (2000 <= cases && cases < 5000) {
      let r = (cases / 5000) * 15
      rayon = r;
    } else if (5000 <= cases && cases < 11000) {
      let r = (cases / 15000) * 30
      rayon = r;
    } else if (11000 <= cases && cases < 100000) {
      let r = (cases / 100000) * 35
      rayon = r;
    }
    return (rayon < 1 && rayon > 0) ? 1 : rayon;
  }

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

  //get node color
  getNodeColor = (id, media) => {
    var childsCount = media.filter(d => d.id === id).length;
    if (childsCount == 0) {
      return "rgba(65, 131, 215, 1)";
    } else {
      return "rgba(214, 69, 65, 1)";
    }
  };

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
    // svg.selectAll("circle").attr("transform", transform);

  };



  //Projection and path calculator
  projection() {
    var geoMercator = d3
      .geoMercator()
      .scale(100)
      .translate([800 / 2, 350 / 2]);

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
