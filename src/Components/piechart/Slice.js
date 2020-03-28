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
    // d3.selectAll("#piePath")
    // .transition().duration(100);
    d3.select("#leftside")
      .append("div")
      .attr("id", "tooltip")
      .attr("class", "tooltip-donut")
      .style("opacity", 0);

  };
  render() {
    let { element, fill, innerRadius = 0, outerRadius } = this.props;
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
      .padRadius(50)
      .cornerRadius(2);

    return (
      <path
        id="piePath"
        style={{transitionDuration: 250+'ms'}}
        d={arc2(element)}
        fill={fill}
        className="slice"
        onMouseMove={e => {
          this.props.onMouseMove(e, element);
        }}
        onMouseOut={() => {
          this.onMouseOut();
        }}
      ></path>
    );
  }



  onMouseOut = () => {
    d3.select("#tooltip").style("opacity", 0);
  };
}
