import * as d3 from "d3";
import React from "react";
import Slice from "./Slice";
import PieLegend from "./PieLegend";
export default class Pie extends React.Component {
  constructor(props) {
    super(props);
    // https://github.com/d3/d3/wiki/Ordinal-Scales#category10
  }

  render() {
    let { x, y, data, pieLegendData } = this.props;

    // https://github.com/d3/d3/wiki/Pie-Layout
    let pie = d3.pie();
    console.log("test101",data,pie(data))
    return (
      <g transform={`translate(${x}, ${y})`} className="piechart">
        {/* Render a slice for each data point */}
        {pie(data).map((d, i) => {
          console.log("123",data,i)
          return this.renderSlice(d, i);
        })}
        <PieLegend pieLegendData={pieLegendData}></PieLegend>
      </g>
    );
  }

  renderSlice = (element, i) => {
    console.log("renderSlice",element,i)
    return (
      <Slice
        key={i}
        outerRadius={this.props.radius}
        innerRadius={this.props.radius / 3}
        value={element}
        fill={this.getColor(i,element)}
        onMouseMove={(event, value) => this.props.onMouseMove(event, value, i)}
      />
    );
  };

  getColor = (i,element) => {
    console.log(i,element)
    switch (i) {
      case 0:
        return " rgb(201, 93, 22)";
      case 1:
        return "darkgreen";
      case 2:
        return "rgb(197, 23, 23)";
    }
  };
}
