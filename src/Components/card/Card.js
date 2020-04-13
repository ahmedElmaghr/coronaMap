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
      totalStatistics = data.filter((elt) => {
        return elt.Country == "World";
      })[0];
    }
    let totalConfirmed;
    let activeCases;
    let recovered;
    let totalDeaths;
    let newDeaths;
    let newCases;
    if (countryClicked) {
      totalConfirmed = countryClicked.TotalCases;
      activeCases = countryClicked.ActiveCases;
      recovered = countryClicked.TotalRecovered;
      totalDeaths = countryClicked.TotalDeaths;
      newDeaths =countryClicked.NewDeaths;
      newCases = countryClicked.NewCases;
    } else {
      totalConfirmed = totalStatistics.TotalCases;
      activeCases = totalStatistics.ActiveCases;
      recovered = totalStatistics.TotalRecovered;
      totalDeaths = totalStatistics.TotalDeaths;
      newDeaths =totalStatistics.NewDeaths;
      newCases = totalStatistics.NewCases;
    }
    //
    return (
      <div>
        <div className="counter-large">
            <p className="counter-number fp-red">{uihelper.buildCountUpByStringValue(totalConfirmed)}</p>
            <p className="counter-tile fp-red">confirmed cases</p>
        </div>
      <div className="counters">
        <div className="counter border-right-black ">
            <p className="counter-number fp-black">
              {uihelper.buildCountUpByStringValue(activeCases)} <span style={{fontSize:15+'px'}}>{newCases ? " ("+newCases+ ")" : ""}</span>
              </p>
            <p>active cases</p>
        </div>
        <div className="counter border-right-black ">
            <p className="counter-number fp-green">{uihelper.buildCountUpByStringValue(recovered)}</p>
            <p>recovered</p>
        </div>
        <div className="counter  ">
            <p className="counter-number fp-black">
            {uihelper.buildCountUpByStringValue(totalDeaths)}<span style={{fontSize:15+'px'}}>{newDeaths ? " ("+newDeaths+ ")" : ""}</span>
            </p>
            <p>deaths</p>
        </div>
      </div>
      {/* <div className="row" style={{ marginLeft: 10 + "px" ,marginRight: 10 + "px" }}>
        <div className="col card">
          <div className="red-title">
            {" "}
            <i class="fa fa-globe" aria-hidden="true"></i> Total cases
          </div>
          <div className="red-content">
            {uihelper.buildCountUpByStringValue(totalConfirmed)}
          </div>
        </div>
        <div className="col card">
          <div className="blue-title">
            <i class="fa fa-ambulance" aria-hidden="true"></i> Active cases
          </div>
          <div className="blue-content">
            {uihelper.buildCountUpByStringValue(activeCases)}{newCases ? " ("+newCases+ ")" : ""}
          </div>
        </div>
        <div className="col card">
          <div className="green-title">
            <i class="fa fa-heart" aria-hidden="true"></i> Recovered
          </div>
          <div className="green-content">
            {uihelper.buildCountUpByStringValue(recovered)}
          </div>
        </div>
        <div className="col card">
          <div className="black-title">
            <i class="fa fa-heartbeat" aria-hidden="true"></i> Total Deaths
          </div>
          <div className="black-content">
            {uihelper.buildCountUpByStringValue(totalDeaths)}{newDeaths ? " ("+newDeaths+ ")" : ""}
          </div>
        </div>
      </div> */}
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
