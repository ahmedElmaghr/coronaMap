import React from "react";
import "./Panel.css";
export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { stat, visibility, x, y } = this.props;
    return (
      <div >
        <div id="panelStat"
          class="mapboxgl-popup mapboxgl-popup-anchor-bottom"
          style={{ top: x+'px', left: y+'px', visibility: visibility }}
        >
          <div class="mapboxgl-popup-tip"></div>
          <div class="mapboxgl-popup-content">
            <div
              class="maphub-popup-inner maphub-popup-text ps"
              style={{ maxHeight: 411 + "px", maxWidth: 840 + "px" }}
            >
              <div class="nicetext">
                <div>
                  <div class="nicetext-title">
                    <h1>
                      <span>{stat ? stat.Country : ""}</span>
                    </h1>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      color: "blue",
                      borderTop: "solid 1px",
                      margin: "2px 2px 2px 2px",
                      borderRadius: 6 + "px"
                    }}
                  >
                    Active cases :{" "}
                    {stat && stat.ActiveCases ? stat.ActiveCases : "0"}
                  </p>
                  <p
                    style={{
                      color: "green",
                      borderTop: "solid 1px",
                      margin: "2px 2px 2px 2px",
                      borderRadius: 6 + "px"
                    }}
                  >
                    Recovered cases :{" "}
                    {stat && stat.TotalRecovered ? stat.TotalRecovered : "0"}{" "}
                  </p>
                  <p
                    style={{
                      color: "orange",
                      borderTop: "solid 1px",
                      margin: "2px 2px 2px 2px",
                      borderRadius: 6 + "px"
                    }}
                  >
                    Deaths : {stat && stat.TotalDeaths ? stat.TotalDeaths : "0"}
                  </p>
                </div>
              </div>
              <div class="ps__rail-x" style={{ left: 0 + "px", top: 0 + "px" }}>
                <div
                  class="ps__thumb-x"
                  tabindex="0"
                  style={{ left: 0 + "px", width: 0 + "px" }}
                ></div>
              </div>
              <div
                class="ps__rail-y"
                style={{ top: 0 + "px", right: 0 + "px" }}
              >
                <div
                  class="ps__thumb-y"
                  tabindex="0"
                  style={{ top: 0 + "px", height: 0 + "px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getData = data => {
    if (data) {
      return [data.ActiveCases, data.TotalDeaths, data.TotalRecovered];
    } else {
      return [0];
    }
  };
}
