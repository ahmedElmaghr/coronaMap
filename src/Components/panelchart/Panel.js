import React from "react";
import StringUtils from "../../utils/StringUtils";
import "./Panel.css";

export default class Panel extends React.Component {
  
  componentWillMount(){
    document.addEventListener("click",this.handleClick,false)
  }

  componentWillUnmount(){
    document.removeEventListener("click",this.handleClick,false)
  }

  handleClick=(e)=>{
    if(this.node.contains(e.target)){
      return;
    }
    this.handleClickOutside(e)
  }

  handleClickOutside=(e)=>{
    if(e.target.tagName!=="path" && e.target.tagName!=="circle"){
      this.props.closePanel();
    }
  }

  render() {
    let { stat, opacity,zIndex, x, y } = this.props;
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
            <div
              className="maphub-popup-inner maphub-popup-text ps"
              style={{ maxHeight: 411 + "px", maxWidth: 840 + "px" }}
            >
              <span
                className="closePanel"
                onClick={() => {
                  this.props.closePanel();
                }}
              >
                X
              </span>
              <div className="nicetext">
                <div>
                  <div className="nicetext-title panelTitle1">
                    <img className = "impFlag"src={stat?(stat.countryInfo? stat.countryInfo.flag : "") : ""}/>
                    {" "}
                    <span>{stat ? stat.country : ""}</span>
                    
                  </div>
                </div>
                <div>
                  <p className="panelTitle2">Daily news</p>
                  {this.getPanelParagraph(
                    stat,
                    "green",
                    "New recovered",
                    "todayRecovered"
                  )}
                  {this.getPanelParagraph(
                    stat,
                    "darkorange",
                    "New cases",
                    "todayCases"
                  )}
                  {this.getPanelParagraph(
                    stat,
                    "darkred",
                    "New deaths",
                    "todayDeaths"
                  )}
                  <p className="panelTitle2">Total</p>
                  {this.getPanelParagraph(
                    stat,
                    "green",
                    "Total recovered",
                    "recovered"
                  )}
                  {this.getPanelParagraph(
                    stat,
                    "black",
                    "Total deaths",
                    "deaths"
                  )}
                  {this.getPanelParagraph(
                    stat,
                    "darkorange",
                    "Total cases",
                    "cases"
                  )}
                  {this.getPanelParagraph(
                    stat,
                    "black",
                    "Total tests",
                    "tests"
                  )}
                </div>
              </div>
              <div
                className="ps__rail-x"
                style={{ left: 0 + "px", top: 0 + "px" }}
              >
                <div
                  className="ps__thumb-x"
                  tabIndex="0"
                  style={{ left: 0 + "px", width: 0 + "px" }}
                ></div>
              </div>
              <div
                className="ps__rail-y"
                style={{ top: 0 + "px", right: 0 + "px" }}
              >
                <div
                  className="ps__thumb-y"
                  tabIndex="0"
                  style={{ top: 0 + "px", height: 0 + "px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getPanelParagraph = (stat,color,label,field)=>{
    return <p
    style={{
      color,
       //borderTop: "solid 1px",
      margin: "2px 2px 2px 2px",
       //borderRadius: 6 + "px",
      fontSize: 12+'px',
      fontWeight: 'bold'
    }}
  >
    
    {label + ": "}
    {(stat && StringUtils.isNotEmpty(stat[field])) ? StringUtils.formatNumberToString(stat[field]) : "0"}

  </p>
  }
}
