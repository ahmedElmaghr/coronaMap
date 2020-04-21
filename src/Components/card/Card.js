import React, { Component } from "react";
import "./Card.css";
import uihelper from "../../Utils/UIHelper";
import StringUtils from "../../Utils/StringUtils";

export default class Card extends Component {
  render() {
    const covid19 = this.props.covid19;
    const countryClicked = this.props.countryClicked;

    let todayData = covid19.todayData;
    let lastDayData = covid19.lastDayData;
    let todayTotal;
    let lastDayTotal;
    if (Array.isArray(todayData) && todayData.length) {
      //FIXME : refactor this code
      todayTotal = todayData.filter((elt) => {
        return elt.Country == "World";
      })[0];
    }
    if (Array.isArray(lastDayData) && lastDayData.length) {
      //FIXME : refactor this code
      lastDayTotal = lastDayData.filter((elt) => {
        return elt && elt.Country == "World";
      })[0];
    }

    let totalConfirmed;
    let activeCases;
    let recovered;
    let newRecovered;
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
      totalConfirmed = todayTotal.TotalCases;
      activeCases = todayTotal.ActiveCases;
      recovered = todayTotal.TotalRecovered;
      totalDeaths = todayTotal.TotalDeaths;
      newDeaths =todayTotal.NewDeaths;
      newCases = todayTotal.NewCases;
    }
    newRecovered = this.calculateNewRecovered(todayTotal.TotalRecovered,lastDayTotal.TotalRecovered)
    
    return (
      <div>
        <div className="counter-large">
          <p className="counter-number fp-red">
            {uihelper.buildCountUpByStringValue(totalConfirmed)}
            <span style={{ fontSize: 15 + "px" }}>
              {newCases ? " (" + newCases + ")" : ""}
            </span>
          </p>
          <p className="counter-tile fp-red">confirmed cases</p>
        </div>
        <div className="counters">
          <div className="counter fp-orange border-right-black ">
            <p className="counter-number ">
              {uihelper.buildCountUpByStringValue(activeCases)}{" "}
              <span style={{ fontSize: 15 + "px" }}>
                {newCases ? " (" + newCases + ")" : ""}
              </span>
            </p>
            <p>active cases</p>
          </div>
          <div className="counter border-right-black fp-green ">
            <p className="counter-number ">
              {uihelper.buildCountUpByStringValue(recovered)}
              <span style={{ fontSize: 15 + "px" }}>
                {newRecovered ? " (+" + this.numberWithCommas(newRecovered) + ")" : ""}
              </span>
            </p>
            <p>recovered</p>
          </div>
          <div className="counter  ">
            <p className="counter-number fp-black">
              {uihelper.buildCountUpByStringValue(totalDeaths)}
              <span style={{ fontSize: 15 + "px" }}>
                {newDeaths ? " (" + newDeaths + ")" : ""}
              </span>
            </p>
            <p>deaths</p>
          </div>
        </div>
        
      </div>
    );
  }

  calculateNewRecovered = (today,lastDay)=>{
    let todayTemp = StringUtils.stringVirSepToNumber(today);
    let lastDayTemp = StringUtils.stringVirSepToNumber(lastDay);
    return todayTemp-lastDayTemp;

  }

  numberWithCommas = (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
}
