import * as d3 from "d3";
import React from "react";
import Slice from "./Slice";
export default class Pie extends React.Component {
  constructor(props) {
    super(props);
    // https://github.com/d3/d3/wiki/Ordinal-Scales#category10
    this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const sum=0;
  }
  
  render() {
    let { x, y, data } = this.props;
    this.sum = data.reduce((total,num)=>{
      return parseInt(total, 10) + parseInt(num, 10) ;
    })
    // https://github.com/d3/d3/wiki/Pie-Layout
    let pie = d3.pie();
    return (
      <g transform={`translate(${x}, ${y})`} className="piechart">
        {/* Render a slice for each data point */}
        {pie(data).map( (d,i) =>{return this.renderSlice(d,i)})}
      </g>
    );
  }

  renderSlice = (value, i)=> {
    // We'll create this component in a minute
    return (
      <Slice
        key={i}
        outerRadius={this.props.radius}
        value={value}
        sum={this.sum}
        fill={this.getColor(i)}
      />
    );
  }

  mouseover = (value, i) => {
    console.log("value",value)
    console.log("i",i)
  };

  mouseout = (d, i) => {};

  getColor = i => {
    switch (i) {
      case 2:
        // black
        return "rgb(0, 0, 0)";
      case 1:
        // green
        return "darkgreen";
      case 0:
        //red
        return "rgb(191,33,47)";
    }
  };
}
