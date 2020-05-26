import React from "react";
import StringUtils from "../../Utils/StringUtils";
import "./Panel.css";

export default class Panel extends React.Component {
  componentWillMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClickOutside(e);
  };

  handleClickOutside = (e) => {
    if (e.target.tagName !== "path" && e.target.tagName !== "circle") {
      this.props.closePanel();
    }
  };
  calculateNewRecovered =(totalRecovered,lastDayTotalRecovered)=>{
      let totalRecoveredNumber = StringUtils.stringVirSepToNumber(totalRecovered);
      let lastDayTotalRecoveredNumber = StringUtils.stringVirSepToNumber(lastDayTotalRecovered);
      console.log("totalRecovered",totalRecovered,totalRecoveredNumber)
      console.log("lastDayTotalRecovered",lastDayTotalRecovered,lastDayTotalRecoveredNumber)
      return totalRecoveredNumber - lastDayTotalRecoveredNumber;
  }
  render() {
    console.log("render panel")
    let { stat,lastDayStat, opacity, zIndex, x, y } = this.props;
    // let totalCases = stat.TotalCases;
    let totalCases = stat && stat.TotalCases;
    let totalRecovered;
    let lastDayTotalRecovered;
    let totalDeaths;
    let activeCases;
    let newRecovered;
    let newCases;
    let newDeaths;
    if (stat && lastDayStat) {
      totalRecovered = StringUtils.isNotEmpty(stat.TotalRecovered)
        ? stat.TotalRecovered
        : "0";
      lastDayTotalRecovered = StringUtils.isNotEmpty(lastDayStat.TotalRecovered)
        ? lastDayStat.TotalRecovered
        : "0";
      totalDeaths = StringUtils.isNotEmpty(stat.TotalDeaths)
        ? stat.TotalDeaths
        : "0";
      activeCases = StringUtils.isNotEmpty(stat.ActiveCases)
        ? stat.ActiveCases
        : "0";
      newRecovered = this.calculateNewRecovered(totalRecovered,lastDayTotalRecovered);
      newCases = StringUtils.isNotEmpty(stat.NewCases) ? stat.NewCases : "0";
      newDeaths = StringUtils.isNotEmpty(stat.NewDeaths) ? stat.NewDeaths : "0";
    }

    return (
      <div ref={(node) => (this.node = node)}>
        <div
          id="panelStat"
          className="mapboxgl-popup mapboxgl-popup-anchor-bottom"
          style={{
            top: y + "px",
            left: x + "px",
            opacity: opacity,
            zIndex: zIndex,
          }}
        >
          <div className="mapboxgl-popup-tip"></div>
          <div className="mapboxgl-popup-content">
            <div>
              <div className="nicetext">
                <div>
                  <div className="nicetext-title">
                    <span>{stat ? stat.Country : ""}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <table class="table table-bordered table-hover ">
                      <thead>
                        <tr className="table-info">
                          <th colSpan="3" className="rowHead">
                            Today statistics
                          </th>
                        </tr>
                      </thead>{" "}
                      <tbody>
                        <tr className="totalRecovered " style={{color:'green'}}>
                          <td><i class="fa fa-heart" aria-hidden="true" ></i> 
                          {"recovered (+" + newRecovered + ")"}
                          </td>
                          <td>
                            {this.calculatePerCent(totalRecovered, totalCases) +
                              "%"}
                          </td>
                          <td className="center">{totalRecovered}</td>
                        </tr>
                        <tr className="totalDeaths "style={{color:'black'}}>
                          <td><i class="fa fa-heartbeat" aria-hidden="true" ></i> 
                          {"deaths (" + newDeaths + ")"}</td>
                          <td>
                            {this.calculatePerCent(totalDeaths, totalCases) +
                              "%"}
                          </td>
                          <td className="center">{totalDeaths}</td>
                        </tr>
                        <tr className="activeCases " style={{color:'red'}}>
                          <td><i class="fa fa-ambulance" ></i>{" actives (" + newCases + ")"}</td>
                          <td>
                            {this.calculatePerCent(activeCases, totalCases) +
                              "%"}
                          </td>
                          <td className="center">{activeCases}</td>
                        </tr>
                        <tr className="totalCases table-info ">
                          <td>Total cases</td>
                          <td colSpan="2" className="center">
                            {stat && StringUtils.isNotEmpty(stat.TotalCases)
                              ? stat.TotalCases
                              : "0"}
                          </td>
                        </tr>
                        <tr className="totalTest table-info ">
                          <td>Total tests</td>
                          <td colSpan="2" className="center">
                            {stat && StringUtils.isNotEmpty(stat.TotalTest)
                              ? stat.TotalTest
                              : "undefined"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  calculatePerCent = (partialValue, totalValue) => {
    if (!partialValue || !totalValue) {
      return "undefined";
    }
    var partialValueAsInt = StringUtils.stringVirSepToNumber(partialValue);
    var totalValueAsInt = StringUtils.stringVirSepToNumber(totalValue);
    return ((100 * partialValueAsInt) / totalValueAsInt).toFixed(1);
  };
  getData = (data) => {
    if (data) {
      return [data.TotalCases, data.TotalDeaths, data.TotalRecovered];
    } else {
      return [0];
    }
  };
}
