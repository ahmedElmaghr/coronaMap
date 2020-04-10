import React from "react";
import "./Panel.css";
import StringUtils from "../../Utils/StringUtils";

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

  render() {
    let { stat, opacity, zIndex, x, y } = this.props;
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
                    <table class="table table-bordered  ">
                      <thead>
                        <tr className="table-primary" >
                          <th colSpan="2" className ="rowHead" >Today's update</th>
                        </tr>
                      </thead>{" "}
                      <tbody className="tbody">
                        <tr className="newCases">
                          <td>New cases</td>
                          <td className="center">
                            {stat && StringUtils.isNotEmpty(stat.NewCases)
                              ? stat.NewCases
                              : "0"}
                          </td>
                        </tr>
                        <tr className="newDeaths">
                          <td>New deaths</td>
                          <td className="center">
                            {stat && StringUtils.isNotEmpty(stat.NewDeaths)
                              ? stat.NewDeaths
                              : "0"}
                          </td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr className="table-info" >
                          <th colSpan="2" className="rowHead">Total update</th>
                        </tr>
                      </thead>{" "}
                      <tbody>
                      <tr className="totalRecovered">
                          <td>Total recovered</td>
                          <td className="center">
                            {stat && StringUtils.isNotEmpty(stat.TotalRecovered)
                              ? stat.TotalRecovered
                              : "0"}
                          </td>
                        </tr>
                        <tr className="totalDeaths">
                          <td>Total deaths</td>
                          <td className="center">
                            {stat && StringUtils.isNotEmpty(stat.TotalDeaths)
                              ? stat.TotalDeaths
                              : "0"}
                          </td>
                        </tr>
                        <tr className="totalCases">
                          <td>Total cases</td>
                          <td>
                            {stat && StringUtils.isNotEmpty(stat.TotalCases)
                              ? stat.TotalCases
                              : "0"}
                          </td>
                        </tr>  
                      </tbody>
                    </table>
                  </div>
                  {/* <p className="newCases">
                    New cases:{" "}
                    {stat && StringUtils.isNotEmpty(stat.NewCases)
                      ? stat.NewCases
                      : "0"}
                  </p>
                  <p className="newDeaths">
                    New deaths :{" "}
                    {stat && StringUtils.isNotEmpty(stat.NewDeaths)
                      ? stat.NewDeaths
                      : "0"}
                  </p>
                  <p className="totalRecovered">
                    Total recovered :{" "}
                    {stat && stat.TotalRecovered ? stat.TotalRecovered : "0"}{" "}
                  </p>
                  <p className="totalDeaths">
                    Total deaths :{" "}
                    {stat && StringUtils.isNotEmpty(stat.TotalDeaths)
                      ? stat.TotalDeaths
                      : "0"}
                  </p>
                  <p className="totalCases">
                    Total cases :{" "}
                    {stat && stat.TotalCases ? stat.TotalCases : "0"}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getData = (data) => {
    if (data) {
      return [data.TotalCases, data.TotalDeaths, data.TotalRecovered];
    } else {
      return [0];
    }
  };
}
