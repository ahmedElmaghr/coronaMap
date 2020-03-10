import React from "react";
import "./Panel.css";
export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
    document.addEventListener("click",this.handleClick,false)
  }

  componentWillUnmount(){
    document.removeEventListener("click",this.handleClick,false)
  }

  handleClick=(e)=>{
    if(this.node.contains(e.target)){
      console.log("click inside Panel")
      return;
    }
    this.handleClickOutside(e)
  }

  handleClickOutside=(e)=>{
    console.log("click outside Panel",e.target.tagName);
    if(e.target.tagName!="circle"){
      this.props.closePanel();
    }
  }

  render() {
    let { stat, opacity,zIndex, x, y } = this.props;
    return (
      <div ref={node => this.node=node}>
        <div id="panelStat"
          class="mapboxgl-popup mapboxgl-popup-anchor-bottom"
          style={{ top: x + 'px', left: y + 'px', opacity: opacity ,zIndex: zIndex}}
        >
          <div className="mapboxgl-popup-tip"></div>
          <div className="mapboxgl-popup-content">
            <div
              className="maphub-popup-inner maphub-popup-text ps"
              style={{ maxHeight: 411 + "px", maxWidth: 840 + "px" }}
            >
              <span className="closePanel" onClick={()=>{this.props.closePanel()}}>X</span>
              <div className="nicetext">  
                <div>
                  <div className="nicetext-title">
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
                    Total cases :{" "}
                    {stat && stat.TotalCases ? stat.TotalCases : "0"}
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
                      color: "red",
                      borderTop: "solid 1px",
                      margin: "2px 2px 2px 2px",
                      borderRadius: 6 + "px"
                    }}
                  >
                    Deaths : {stat && stat.TotalDeaths ? stat.TotalDeaths : "0"}
                  </p>
                </div>
              </div>
              <div className="ps__rail-x" style={{ left: 0 + "px", top: 0 + "px" }}>
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
      </div >
    );
  }

  getData = data => {
    if (data) {
      return [data.TotalCases, data.TotalDeaths, data.TotalRecovered];
    } else {
      return [0];
    }
  };
}
