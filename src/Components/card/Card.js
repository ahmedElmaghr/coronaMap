import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const covid19 = this.props.covid19;
    let data = covid19;
    let totalStatistics;
    if (Array.isArray(data) && data.length) {
      //FIXME : refactor this code
      totalStatistics = data.filter((elt) => { return elt.Country == "Total:" })[0]
    }
    let totalConfirmed = totalStatistics.TotalCases;
    let recovered = totalStatistics.TotalRecovered;
    let totalDeaths = totalStatistics.TotalDeaths;

    return (
      <div style={{ marginLeft: 10 + "px" }}>
        <div className="card">
          <div className="red-title">Total Confirmed</div>
          <div className="red-content">{totalConfirmed}</div>
        </div>
        <div className="card">
          <div className="green-title">Recovered</div>
          <div className="green-content">{recovered}</div>
        </div>
        <div className="card">
          <div className="black-title">Total Deaths</div>
          <div className="black-content">{totalDeaths}</div>
        </div>
      </div>
    );
  }
}
