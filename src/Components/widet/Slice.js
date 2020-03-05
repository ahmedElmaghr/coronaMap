import * as d3 from "d3";
import React from "react";
export default class Slice extends React.Component {
    render() {
      let {value, fill, innerRadius = 0, outerRadius} = this.props;
      // https://github.com/d3/d3/wiki/SVG-Shapes#arc
      let arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
      return (
        <path d={arc(value)} fill={fill} />
      );
    }
  }