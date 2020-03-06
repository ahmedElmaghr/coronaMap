import * as d3 from "d3";
import React, { PureComponent } from "react";
import { merge } from "topojson-client";
import { StringUtils } from "../../Utils/StringUtils.js";
import "./CoronaMapViewCss.css";
import DataHelper from "../../Utils/DataHelper.js";

export default class CoronaMapView extends PureComponent {
  //Constantes

  width = "100%";
  height = "100%";
  scale = 250;
  lastX = 0;
  lastY = 0;
  origin = {
    x: 55,
    y: -40
  };
  viewBox = "0 0 800 450";
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
      .attr("className", "country")
      .attr("d", d => this.calculatePath(d))
      .attr("stroke", this.borderColor)
      .attr("stroke-width", 0.05)
      .attr("fill", `#9ecce6`);
  };

  render() {
    const countries = this.props.countries;
    const covid19 = this.props.covid19;
    const { worldData } = this.props;
    if (this.props.activated && worldData.length > 0) {
      this.initMarkersAndLinks();
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
    var gGlobal = d3.select("#gWrapper");
    //Draw Medias
    this.drawMediaPosition(gGlobal, countries, covid19);
    //add zoom
    this.addZoom(gGlobal);
  };

  //Draw svg wrapper for map
  drawSvgWrapper() {
    //Construct Body
    var body = d3.select("body");
    //Construct SVG
    var svg = body
      .append("svg")
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
      );
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
        .attr("key", i => `path-${i}`)
        .attr("d", d => this.calculatePath(d))
        .attr("className", "country")
        .attr("fill", (d) => {
          return this.markDesease(d)
        })
        .attr("stroke", this.borderColor)
        .attr("stroke-width", 0.05)
        // .on("click", (d) => {
        //   this.props.click(d);
        //   console.log(d);
        // })

      return g;
    }
  };

  //Color land 
  markDesease = (d) => {
    console.log("codiv19", this.props.covid19)
    console.log(d.properties.name)
    let elt = this.props.covid19.data.filter((e) => { return e.Country == d.properties.name })
    console.log("elt", elt)
    if (elt[0]) {
      let totalCases = elt[0].TotalCases;
      //let red = this.getCountryColor(totalCases);
      return this.getCountryColor(totalCases);

    } else {
      return `rgba(218, 223, 225, 1)`
    }
  }
  //Get country color range rgba(255,255,255)
  getCountryColor = (totalCases) => {

    if (0 < totalCases &&  totalCases<= 100) {
      return '#9ecce6'
    } else if(100 < totalCases &&  totalCases< 200) {
      return '#4c9bc4'
    }else if(200 < totalCases &&  totalCases< 500) {
      return '#b8d4e0'
    }else if(500 < totalCases &&  totalCases< 1000) {
      return '#96bbd5'
    }else if(1000 <= totalCases &&  totalCases< 5000) {
      return '#82adbe'
    }else if(5000 <= totalCases &&  totalCases< 100000) {
      return 'darkslateblue'
    }
    else{
    }
    

  }
  //Add Markers Function
  drawMediaPosition = (node, countries, covid19) => {
    let data = DataHelper.constructData(countries, covid19);
    var markers = node.append("g").attr("class", "markers");
    markers
      .selectAll("circle")
      .data(data.filter(d => d.stat.TotalCases != 0))
      .enter()
      .append("circle")
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
      .attr("fill", 'rgba(255, 0, 0,0.5)')
      .attr("stroke", "red")
      .attr("stroke-width", 0.5)
      .attr("class", "marker")
      .on("click", (d) => {
        this.props.click(d);
      })
      .append("title")
      .text((d) => { return `country : ${d.data.name} cases : ${d.stat.TotalCases}` })

    return markers;
  };

  getRadius = (d) => {
    let rayon = 0;
    let cases = d.stat.TotalCases;
    /* [0,5] px*/
    if (0 < cases &&  cases<= 100) {
      let r = (cases / 100) * 4
      rayon = r;
    } else if(100 < cases &&  cases< 200) {
      let r = (cases / 200) * 5
      rayon = r;
    }else if(200 < cases &&  cases< 500) {
      let r = (cases / 500) * 7
      rayon = r;
    }else if(500 < cases &&  cases< 2000) {
      let r = (cases / 2000) * 17
      rayon = r;
    }else if(2000 <= cases &&  cases< 5000) {
      let r = (cases / 5000) * 15
      rayon = r;
    }else if(5000 <= cases &&  cases< 100000) {
      let r = (cases / 100000) * 30
      rayon = r;
    }
    else{
      rayon = 0;
    }
    return rayon;
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

  //get child
  getChildCount = (nom, media) => {
    var childsCount = media.filter(d => d.origine_name == nom).length;
    if (childsCount === 0) {
      return 1;
    }
    return childsCount;
  };

  drawCnx = (g, relations) => {
    //build links
    var links = this.buildLinks(relations);
    this.addLinks(g, links);
  };

  //build links
  buildLinks = (relations) => {
    var links = [];
    if (relations) {
      relations.forEach((d, i) => {
        var link = this.createLinkObject(d);
        //add new link object
        if (this.validateLink(link)) {
          links.push(link);
        }
      });
    }
    return links;
  };

  //create a link DTO
  createLinkObject = (d) => {
    var link = {
      origine: {
        value: d.origine,
        coordinate: [d.origin_y, d.origin_x]
      },
      cible: {
        value: d.cible,
        coordinate: [d.cible_y, d.cible_x]
      },
      lien: d.valeur,
      etat: d.etat
    };
    return link;
  };
  validateLink = link => {
    var linkOrigineCoordinate = link.origine.coordinate;
    var linkCibleCoordinate = link.cible.coordinate;
    if (
      linkOrigineCoordinate != null &&
      linkOrigineCoordinate.x != "" &&
      linkOrigineCoordinate.y != "" &&
      linkCibleCoordinate != null &&
      linkCibleCoordinate.x != "" &&
      linkCibleCoordinate.y != ""
    ) {
      return true;
    }
    return false;
  };

  //creation de connection entre deux pays
  addLinks = (node, links) => {
    this.drawLink(node, links);
  };

  //TODO
  drawLink = (node, links) => {
    //We use this function curve instead of LineString Object to draw direct line
    var curve = context => {
      var custom = d3.curveLinear(context);
      custom._context = context;
      custom.point = function (x, y) {
        var x = +x;
        var y = +y;
        switch (this._point) {
          case 0:
            this._point = 1;
            this._line
              ? this._context.lineTo(x, y)
              : this._context.moveTo(x, y);
            this.x0 = x;
            this.y0 = y;
            break;
          case 1:
            this._point = 2;
          default:
            var x1 = this.x0 * 0.5 + x * 0.5;
            var y1 = this.y0 * 0.5 + y * 0.5;
            var m = 1 / (y1 - y) / (x1 - x);
            var r = -100; // offset of mid point.
            var k = r / Math.sqrt(1 + m * m);
            if (m == Infinity) {
              y1 += r;
            } else {
              y1 += k;
              x1 += m * k;
            }
            this._context.quadraticCurveTo(x1, y1, x, y);
            this.x0 = x;
            this.y0 = y;
            break;
        }
      };
      return custom;
    };

    //Draw a line between two points
    var line = d3
      .line()
      .x(d => {
        return this.projection()([
          d.coordinate[0],
          d.coordinate[1]
        ])[0];
      })
      .y(d => {
        return this.projection()([
          d.coordinate[0],
          d.coordinate[1]
        ])[1];
      })
      .curve(curve);

    node
      .append("g")
      .attr("class", "paths")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .style("stroke", d => this.colorPath(d))
      .style("stroke-width", 0.5)
      .style("fill", "none")
      .attr("opacity", 0.7)
      .datum(d => {
        return [d.origine, d.cible];
      })
      .attr("d", line)
      .append("title")
      .text(d => d.lien);
  };

  colorPath = link => {
    switch (link.etat) {
      case "P":
        //Orange
        return "rgba(242, 120, 75, 1)";
      case "N":
        return "rgba(231, 76, 60, 1)";
      default:
        return "rgba(65, 131, 215, 1)";
    }
  };
  //Add zoom
  addZoom = svg => {
    svg.call(d3.zoom().on("zoom", () => this.zoomed(svg)));
  };

  zoomed = svg => {
    var transform = d3.event.transform;

    svg.attr("transform", transform);
  };

  //Events handlers
  circleOnHover = event => {
    return event.countryName;
  };

  circleOnClick = event => {
  };

  //Projection and path calculator
  projection() {
    var geoMercator = d3
      .geoMercator()
      .scale(100)
      .translate([800 / 2, 450 / 2]);

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
