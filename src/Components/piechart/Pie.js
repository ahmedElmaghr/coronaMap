import * as d3 from "d3";
import React from "react";
import StringUtils from "./../../Utils/StringUtils";
import Slice from "./Slice";
export default class Pie extends React.Component {
  constructor(props) {
    super(props);
    // https://github.com/d3/d3/wiki/Ordinal-Scales#category10
  }

  render() {
    let {data } = this.props;
    //
    var sliceDatas = this.getSliceDatas(data);
    // https://github.com/d3/d3/wiki/Pie-Layout
    let pie = d3.pie().value(d => {
      return d.value;
    });
    var leftside = document.getElementById('leftside');

    

    return (
      //leftside
      <g transform={`translate(0, 0)`} className="piechart">
        {/* Render a slice for each data point */}
        {pie(sliceDatas).map((d, i) => {
          return this.renderSlice(d, i);
        })}
      </g>
    );
  }
  //Array of slice data
  getSliceDatas = data => {
    var sliceData;
    let totalRecovered = parseInt(
      StringUtils.deleteSpecialChar(data.TotalRecovered),
      10
    );
    let totalDeaths = parseInt(
      StringUtils.deleteSpecialChar(data.TotalDeaths),
      10
    );
    let activeCases = parseInt(
      StringUtils.deleteSpecialChar(data.ActiveCases),
      10
    );
    sliceData = [
      {
        label: "Active cases",
        value: activeCases,
        color: "rgba(35, 51, 194,.8)"
      },
      { label: "Total recovered", value: totalRecovered, color: "darkgreen" },
      { label: "Total deaths", value: totalDeaths, color: "rgb(197, 23, 23)" }
    ];
    return sliceData;
  };

  renderSlice = (element, i) => {
    return (
      <Slice
        key={i}
        outerRadius={this.props.radius}
        innerRadius={this.props.radius / 3}
        element={element}
        fill={element.data.color}
        onMouseMove={(event, value) => this.props.onMouseMove(event, value, i)}
      />
    );
  };

}
