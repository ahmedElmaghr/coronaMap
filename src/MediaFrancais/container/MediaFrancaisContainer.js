import React, { Component } from "react";
import { feature } from "topojson-client";
import CoronaMapView from "../../Components/mediaFrancais/CoronaMapView";
import countries from "./../data/countries.tsv"
import * as d3 from "d3"
import PieChart from "../../Components/widet/PieChart";
class MediaFrancaisContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldData: [],
      jsonData: [],
      countries: [],
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
            click={(d) => {
              this.click(d)
            }}
            onmouseout={
              (d) => {
                this.onmouseout(d)
              }
            }
          ></CoronaMapView>
          <PieChart
            visibility={this.state.pieVisiblity}
            data={[5, 2, 7, 1, 1, 3, 4, 9]}
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

  click = (d) => {
    console.log(d)
    this.setState({
      pieVisiblity: "visible"
      
    })
  }

  onmouseout = () => {
    console.log("onmouseout")
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

export default MediaFrancaisContainer;
