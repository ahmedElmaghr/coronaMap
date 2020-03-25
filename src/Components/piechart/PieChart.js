import React, { PureComponent } from "react";
import "./PieChart.css";
import Pie from "./Pie";
import StringUtils from "./../../Utils/StringUtils";
import * as d3 from "d3";
export default class PieChart extends PureComponent {
    constructor(props){
        super(props)
        const sum = 0;
    }
  render() {
    // For a real world project, use something like
    let width = window.screen.width * 0.1;
    let height = window.screen.height * 0.15;
    let minViewportSize = Math.min(width, height);
    // This sets the radius of the pie chart to fit within
    // the current window size, with some additional padding
    let radius = (minViewportSize * 0.9) / 2;
    // Centers the pie chart
    const { x, y } = this.props;
    //
    var data = this.props.data;
    var sliceDatas = this.getSliceDatas(data);
    var pieLegendData = this.getPieLegend(data);
    //
    var totalCases = StringUtils.deleteSpecialChar(data.TotalCases);
    this.sum = parseInt(totalCases, 10);
    return (
      <div className="piechart">
        <svg
          id="pieStat"
          viewBox={`0 0 ` + width + " " + height}
          style={{
            preserveAspectRatio: "xMidYMid meet",
            width: "100%"
          }}
        >
          <Pie
            x={x}
            y={y}
            radius={radius}
            data={sliceDatas}
            pieLegendData={pieLegendData}
            onMouseMove={(event, value,i) => this.onMouseMove(event, value,i)}
          />
        </svg>
      </div>
    );
  }

  onMouseMove = (event, value,i) => {
    var data = this.props.data;
    var pieLegendData = this.getPieLegend(data);
    console.log("mouse over", value.data,i);
    var percent = (value.data / this.sum) * 100;
    var percentRounded = Math.round(percent * 10) / 10;
    var legend = pieLegendData[i];
    d3.select("#tooltip")
      .text(legend +" " + percentRounded + " %")
      .transition()
      .duration("40")
      .style("opacity", 1)
      .style("z-index",5)
      .style("left", event.pageX +10 + "px")
      .style("top", event.pageY - 70 + "px");
  };
  //Array of slice data
  getSliceDatas = data => {
    var sliceData;
    let totalRecovered = StringUtils.deleteSpecialChar(data.TotalRecovered);
    let totalDeaths = StringUtils.deleteSpecialChar(data.TotalDeaths);
    let activeCases = StringUtils.deleteSpecialChar(data.ActiveCases);
    sliceData = [activeCases,totalRecovered, totalDeaths];
    return sliceData;
  };

  getPieLegend = data => {
    return  [ "Recovered","Active cases", "Total Deaths"];
  };
}
