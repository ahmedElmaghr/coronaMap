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
    d3.select("#leftside")
      .append("div")
      .attr("id", "tooltip")
      .attr("class", "tooltip-donut")
      .style("opacity", 0);
  };
  render() {
    let { value, fill, innerRadius = 0, outerRadius } = this.props;
    console.log("Slice render",value);
    // https://github.com/d3/d3/wiki/SVG-Shapes#arc
    let arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    let arc2 = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .padAngle(0.02)
      .padRadius(100)
      .cornerRadius(4);

    return (
      <path
        d={arc2(value)}
        fill={fill}
        className="slice"
        onMouseMove={e => {
          this.props.onMouseMove(e, value);
        }}
        onMouseOut={() => {
          this.onMouseOut();
        }}
      ></path>
    );
  }



  onMouseOut = () => {
    console.log("mouse out");
    d3.select("#tooltip").style("opacity", 0);
  };
}
