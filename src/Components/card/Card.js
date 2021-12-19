import React, { Component } from "react";
import "./Card.css";
import uihelper from "../../Utils/UIHelper";

export default class Card extends Component {
  render() {
    const covid19 = this.props.covid19;
    const countryClicked = this.props.countryClicked;

    let data = covid19;
    let totalStatistics;
    if (Array.isArray(data) && data.length) {
      //FIXME : refactor this code
      totalStatistics = data.filter((elt) => { return elt.Country == "Total:" })[7]
    }
    let totalConfirmed;
    let activeCases;
    let recovered;
    let totalDeaths;
    if (countryClicked) {
      totalConfirmed = countryClicked.TotalCases;
      activeCases = countryClicked.ActiveCases;
      recovered = countryClicked.TotalRecovered;
      totalDeaths = countryClicked.TotalDeaths;
    } else {
      totalConfirmed = totalStatistics.TotalCases;
      activeCases = totalStatistics.ActiveCases;
      recovered = totalStatistics.TotalRecovered;
      totalDeaths = totalStatistics.TotalDeaths;
    }
    //
    return (
      <div style={{ marginLeft: 10 + "px" }}>
        <div className="card">
          <div className="red-title"> <i class="fa fa-globe" aria-hidden="true"></i> Total Confirmed</div>
    <div className="red-content">{uihelper.buildCountUpByStringValue(totalConfirmed)}</div>
        </div>
        <div className="card">
          <div className="orange-title"><i class="fa fa-ambulance" aria-hidden="true"></i> Active cases</div>
          <div className="orange-content">{uihelper.buildCountUpByStringValue(activeCases)}</div>
        </div>
        <div className="card">
          <div className="green-title"><i class="fa fa-heart" aria-hidden="true"></i> Recovered</div>
          <div className="green-content">{uihelper.buildCountUpByStringValue(recovered)}</div>
        </div>
        <div className="card">
          <div className="black-title"><i class="fa fa-heartbeat" aria-hidden="true"></i> Total Deaths</div>
          <div className="black-content">{uihelper.buildCountUpByStringValue(totalDeaths)}</div>
        </div>
      </div>
    );
  }
  
  // buildCountUpByStringValue = (valueStr)=>{
  //   return (
  //     <CountUp
  //       separator=","
  //       end={StringUtils.stringVirSepToNumber(valueStr)}
  //     ></CountUp>
  //   );
  // }

}
