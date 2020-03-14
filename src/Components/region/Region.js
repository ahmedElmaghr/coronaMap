import React, { Component } from 'react';
import * as d3 from "d3";
import DataHelper from "../../Utils/DataHelper.js";
import { StringUtils } from "../../Utils/StringUtils.js";
import "./Region.css";
class Region extends Component {

    componentWillUnmount() {
        console.log("Region : componentWillUnmount ")
        d3.selectAll("#markers").style("opacity",0);
        
    }

    render() {
        console.log("Regin : call render ")
        const { countries, covid19 } = this.props;
        this.drawCircles(countries, covid19);
        //add zoom
        
        return (
            ""
        );
    }

    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("Region shouldComponentUpdate")
        console.log("nextProps", nextProps)
        console.log("nextState", nextState)
        if (nextProps.covid19) {
            return false;
        }
        return true;
    }
    //Create the world map
    drawCircles = (countries, covid19) => {
        let markers = d3.selectAll("#markers")
        if (markers.empty()) {
            var gGlobal = d3.select("#gWrapper");
            //Draw Medias
            this.drawZoneDesease(gGlobal, countries, covid19);
            this.drawDimondPrincess(gGlobal, countries, covid19);
        }else{
            markers.style("opacity",1)
        }
    };

    drawDimondPrincess = (node, countries, covid19) => {
        let dimondPrincess = countries.filter((e) => { return e.country == "DP" });
        let statDP = DataHelper.getStatByPays({ name: "Diamond Princess" }, covid19);

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

        // markers.call(d3.zoom().on("zoom", () => {
        //   this.props.closePanel();
        //   this.zoomed(markers)
        // }));

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
            let r = (cases / 100) * 2
            rayon = r;
        } else if (100 <= cases && cases < 200) {
            let r = (cases / 200) * 4
            rayon = r;
        } else if (200 <= cases && cases < 500) {
            let r = (cases / 500) * 5
            rayon = r;
        } else if (500 <= cases && cases < 2000) {
            let r = (cases / 2000) * 7
            rayon = r;
        } else if (2000 <= cases && cases < 5000) {
            let r = (cases / 5000) * 10
            rayon = r;
        } else if (5000 <= cases && cases < 30000) {
            let r = (cases / 30000) * 30
            rayon = r;
        } else if (30000 <= cases && cases < 100000) {
            let r = (cases / 100000) * 40
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

//Projection and path calculator
projection() {
    var geoMercator = d3
        .geoMercator()
        .scale(100)
        .translate([800 / 2, 550 / 2]);

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