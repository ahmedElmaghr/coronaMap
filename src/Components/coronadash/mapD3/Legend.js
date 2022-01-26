import * as d3 from "d3";
import React, { Component } from "react";
import "./Legend.css";

export default class Legend extends Component {
  componentDidMount() {
    var svg = d3.select("#legend")
    // Handmade legend
    svg.append("circle").attr("cx",10).attr("cy",10).attr("r", 6).style("fill", "#6f8d43")
    svg.append("circle").attr("cx",10).attr("cy",30).attr("r", 6).style("fill", "#71c7ec")
    svg.append("circle").attr("cx",10).attr("cy",50).attr("r", 6).style("fill", "#65b3d4")
    svg.append("circle").attr("cx",10).attr("cy",70).attr("r", 6).style("fill", "#386376")
    svg.append("circle").attr("cx",10).attr("cy",90).attr("r", 6).style("fill", "#16272f")
    // svg.append("circle").attr("cx",10).attr("cy",110).attr("r", 6).style("fill", "#386376")
    svg.append("circle").attr("cx",10).attr("cy",110).attr("r", 6).style("fill", "rgba(218, 223, 225, 1)")

    svg.append("text").attr("x", 30).attr("y", 10).text("no new cases").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 30).text("< 2k").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 50).text("2k - 5K").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 70).text("5K - 15K").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 90).text(">15k").style("font-size", "15px").attr("alignment-baseline","middle")
    // svg.append("text").attr("x", 30).attr("y", 110).text("30K - 100K").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 110).text("infos not available").style("font-size", "15px").attr("alignment-baseline","middle")

    
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