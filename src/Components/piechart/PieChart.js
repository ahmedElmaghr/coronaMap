import * as d3 from "d3";
import React, { PureComponent } from "react";
import Pie from "./Pie";
import "./PieChart.css";
import StringUtils from "./../../Utils/StringUtils";
export default class PieChart extends PureComponent {
  sum = 0;
  constructor(props) {
    super(props);

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
    //
    var countryClicked = this.props.countryClicked;
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
            data={countryClicked ? countryClicked : data}
            onMouseMove={(event, value, i) => this.onMouseMove(event, value, i)}
          />
        </svg>
      </div>
    );
  }

  onMouseMove = (event, element) => {
    console.log("value", element);
    var sum;
    if (this.props.countryClicked) {
      sum = parseInt(
        StringUtils.deleteSpecialChar(this.props.countryClicked.TotalCases),
        10
      );
    } else {
      sum = parseInt(
        StringUtils.deleteSpecialChar(this.props.data.TotalCases),
        10
      );
    }

    var percent = (element.data.value / sum) * 100;
    var percentRounded = Math.round(percent * 10) / 10;
    this.updateTooltip(event, element, percentRounded);
  };

  updateTooltip = (event, element, percentRounded) => {
    d3.select("#tooltip")
      .text(element.data.label + " " + percentRounded + " %")
      .transition()
      .duration("40")
      .style("opacity", 1)
      .style("z-index", 5)
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 70 + "px");
  };
}
