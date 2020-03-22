import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const covid19 = this.props.covid19;
    let data = covid19.data;
    let totalStatistics;
    if (Array.isArray(data) && data.length) {
      totalStatistics = data[data.length - 1];
    }
    let totalConfirmed = totalStatistics.TotalCases;
    let recovered = totalStatistics.TotalRecovered;
    let totalDeaths = totalStatistics.TotalDeaths;

    return (
      <div style={{ marginLeft: 10 + "px" }}>
        <div className="card">
          <div className="black-title">Total Confirmed</div>
          <div className="black-content">{totalConfirmed}</div>
        </div>
        <div className="card">
          <div className="green-title">Recovered</div>
          <div className="green-content">{recovered}</div>
        </div>
        <div className="card">
          <div className="red-title">Total Deaths</div>
          <div className="red-content">{totalDeaths}</div>
        </div>
      </div>
    );
  }
}
