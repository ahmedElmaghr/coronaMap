import React, { Component } from "react";
import { feature } from "topojson-client";
import CoronaMapView from "../../Components/mediaFrancais/CoronaMapView";
import countries from "./../data/countries.tsv"
import covid19 from "./../data/covid19.json"
import * as d3 from "d3"
import PieChart from "../../Components/widet/PieChart";
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldData: [],
      jsonData: [],
      countries: [],
      covid19: covid19,
      pieVisiblity: "hidden"
    };
  }

  componentDidMount() {
    fetch(
      "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-10m.json"
    ).then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then(worldData => {
        this.setState({
          worldData: feature(worldData, worldData.objects.countries).features,
          jsonData: worldData
        });
      });
    });

    d3.tsv(countries).then((response, error) => {
      this.setState({
        countries: response
      })
    })
  }

  render() {
    const { worldData, jsonData, countries } = this.state;
    if (jsonData.length != 0) {

      return (
        <div>
          <CoronaMapView
            worldData={worldData}
            jsonData={jsonData}
            activated={true}
            countries={countries}
            covid19={covid19}
            click={(d) => {
              this.showPie(d)
            }}
            onmouseout={
              (d) => {
                this.onmouseout(d)
              }
            }
          ></CoronaMapView>
          <PieChart
            visibility={this.state.pieVisiblity}
            data={this.getData(this.state.stat)}
            stat={this.state.stat}
            x={50}
            y={50}
          ></PieChart>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  getData = (data) => {
    console.log("pie data", data)
    if (data) {
      return [data.ActiveCases, data.TotalRecovered,data.TotalDeaths];
    }else{
      return [0];
    }
  }

  showPie = (d) => {
    console.log(d);
    this.setState({
      pieVisiblity: "visible",
      stat: d.stat
    })
  }

  onmouseout = () => {
    this.setState({
      pieVisiblity: "hidden"
    })
  }

  constructView = () => {
    const { worldData, jsonData, countries } = this.state;
    if (jsonData.length != 0) {
      return (
        <CoronaMapView
          worldData={worldData}
          jsonData={jsonData}
          activated={true}
          countries={countries}
        ></CoronaMapView>
      );
    }
    return <div></div>
  };

}

export default Container;
