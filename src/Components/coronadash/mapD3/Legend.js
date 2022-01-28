import * as d3 from "d3";
import React, { Component } from "react";
import "./Legend.css";

export default class Legend extends Component {
  componentDidMount() {
    var svg = d3.select("#legend")
    // Handmade legend
    svg.append("rect").attr("x",4).attr("y",0).attr('width', 12).attr('height', 20).style("fill", "#ffedc1")
    svg.append("rect").attr("x",4).attr("y",20).attr('width', 12).attr('height', 20).style("fill", "#95DCF4")
    svg.append("rect").attr("x",4).attr("y",40).attr('width', 12).attr('height', 20).style("fill", "#54CBF2")
    svg.append("rect").attr("x",4).attr("y",60).attr('width', 12).attr('height', 20).style("fill", "#00ACE3")
    svg.append("rect").attr("x",4).attr("y",80).attr('width', 12).attr('height', 20).style("fill", "#008EBC")
    svg.append("rect").attr("x",4).attr("y",100).attr('width', 12).attr('height', 20).style("fill", "#007092")
    svg.append("rect").attr("x",4).attr("y",120).attr('width', 12).attr('height', 15).style("fill", "#B6B6B6")

    svg.append("text").attr("x", 30).attr("y", 10).text("0").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 30).text("1 - 10").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 50).text("11 - 100").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 70).text("101 - 1000").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 90).text("1 001 - 10 000").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 110).text("> 10 000").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 130).text("Not Applicable").style("font-size", "15px").attr("alignment-baseline","middle")

    
  }

  render() {
    let svgMap = d3.selectAll('#content').node().getBoundingClientRect();
    return (
      <div className="legend" style = {{height:'30%',width:'15%',top : svgMap.height*.6,zIndex:1}}>
        <svg  id = "legend" style = {{height:'100%',width:'100%'}}/>
      </div>
    );
  }
}
