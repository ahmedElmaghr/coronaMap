import * as d3 from "d3";
import React from "react";
import "./Slice.css";
export default class Slice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //states
    };
  }

  componentDidMount = () => {
    // console.log("Slice cpmonentDidMount");
    // var svgPie = d3.selectAll("#pieStat");
    d3
      .select(".statistics")
      .append("div")
      .attr("id","tooltip")
      .attr("class", "tooltip-donut")
      .style("opacity", 0);
    // svgPie
    //   .selectAll("path")
    //   //Our new hover effects
    //   .on("mouseover", function(d, i) {
    //     console.log(this.props)
    //     console.log("pie hovered");
    //     d3.select(this)
    //       .transition()
    //       .duration("100")
    //       .attr("opacity", ".7");
    //     div
    //       .transition()
    //       .duration(50)
    //       .style("opacity", 1);
    //     let num = 10;
    //     // Math.round((d.value / d.data.all) * 100).toString() + "%";
    //     div
    //       .html(num)
    //       .style("left", d3.event.pageX + 10 + "px")
    //       .style("top", d3.event.pageY - 15 + "px");
    //   })
    //   .on("mouseout", function(d, i) {
    //     console.log("pie mouse out");
    //     d3.select(this)
    //       .transition()
    //       .duration("50")
    //       .attr("opacity", "1");
    //   });
  };
  render() {
    console.log("Slice render");
    let { value, fill, innerRadius = 0, outerRadius } = this.props;
    // https://github.com/d3/d3/wiki/SVG-Shapes#arc
    let arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    let arc2 = d3
      .arc()
      .innerRadius(30)
      .outerRadius(outerRadius);
    
    return (
      <path
        d={arc2(value)}
        fill={fill}
        className="slice"
        onMouseOver={e => {
          this.onMouseOver(e, value);
        }}
        onMouseMove={e => {
          this.onMouseOver(e, value);
        }}
        onMouseOut={() => {
          this.onMouseOut();
        }}
      ></path>
    );
  }

  onMouseOver = (event,value) => {
    console.log("mouse over",value,event);
    var percent = (value.data/this.props.sum)*100;
    var percentRounded = Math.round(percent * 10) / 10 
    d3.select("#tooltip")
    .text(percentRounded +'%')
    .transition()
    .duration("40")
    .style("opacity",1)
    .style("left", (event.pageX) + "px")
    .style("top", (event.pageY -70) + "px");
  };

  onMouseOut = () => {
    console.log("mouse out");
    d3.select("#tooltip")
    .style("opacity",0);
  };
}
