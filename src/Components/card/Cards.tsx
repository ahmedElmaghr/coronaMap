import React, { Component } from "react";
import { TotalInfo } from "../../models/TotalInfo";
import { formatEpochDateToDate } from "../../utils/dateUtils";
import Card from "./Card";
import "./Cards.css";

interface Props {
  totalInfo: TotalInfo;
}
export default class Cards extends Component<Props, Readonly<{}>> {
  render() {
    const { totalInfo } = this.props;


    let totalConfirmed = totalInfo.cases;
    let activeCases = totalInfo.todayCases;
    let recovered = totalInfo.todayRecovered;
    let totalDeaths = totalInfo.deaths;
    let updated = totalInfo.updated;
    //
    return (
      <>
        <div className="col-8 group-card-left">
          <Card
            title="Confirmed cases"
            contentStyle="red-content"
            icon="fa fa-globe"
            titleStyle="red-title"
            value={totalConfirmed}
            updated={formatEpochDateToDate(updated)}
          />
          <Card
            title="Daily cases"
            contentStyle="orange-content"
            icon="fa fa-ambulance"
            titleStyle="orange-title"
            value={activeCases}
            updated={formatEpochDateToDate(updated)}
          />
        </div>
        <div className="col-8 group-card-right">
          <Card
            title="Confirmed deaths"
            contentStyle="black-content"
            icon="fa fa-heartbeat"
            titleStyle="black-title"
            value={totalDeaths}
            updated={formatEpochDateToDate(updated)}
          />

          <Card
            title="Daily recovered"
            contentStyle="green-content"
            icon="fa fa-heart"
            titleStyle="green-title"
            value={recovered}
            updated={formatEpochDateToDate(updated)}
          />

        </div>
      </>
    );
  }

}
