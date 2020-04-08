import * as d3 from "d3";
import React, { Component } from "react";
import "./Legend.css";

export default class Legend extends Component {
  componentDidMount() {
    var svg = d3.select("#legend")
    // Handmade legend
    svg.append("circle").attr("cx",10).attr("cy",30).attr("r", 6).style("fill", "#FCEEEE")
    svg.append("circle").attr("cx",10).attr("cy",50).attr("r", 6).style("fill", "#F9DCDC")
    svg.append("circle").attr("cx",10).attr("cy",70).attr("r", 6).style("fill", "#F6CBCB")
    svg.append("circle").attr("cx",10).attr("cy",90).attr("r", 6).style("fill", "#EA8686")
    svg.append("circle").attr("cx",10).attr("cy",110).attr("r", 6).style("fill", "#BF2222")
    svg.append("circle").attr("cx",10).attr("cy",130).attr("r", 6).style("fill", "#230606")

    svg.append("text").attr("x", 30).attr("y", 30).text("< 100").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 50).text("100 - 1K").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 70).text("1K - 5K").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 90).text("5K - 30K").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 110).text("30K - 100K").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 30).attr("y", 130).text("> 100K").attr("alignment-baseline","middle")

    
  }

  render() {
    let svgMap = d3.selectAll('#content').node().getBoundingClientRect();
    return (
      <div className="legend" style = {{top : svgMap.height*.6}}>
        <svg  id = "legend" style = {{height:'100%',width:'100%'}}/>
      </div>
    );
  }
}
