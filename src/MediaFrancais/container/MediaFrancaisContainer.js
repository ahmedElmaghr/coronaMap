import React, { Component } from "react";
import { feature } from "topojson-client";
import CoronaMapView from "../../Components/mediaFrancais/CoronaMapView";
import countries from "./../data/countries.tsv"
import * as d3 from "d3"
class MediaFrancaisContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldData: [],
      jsonData: [],
      countries: []
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

    d3.tsv(countries).then((response,error)=>{
      console.log("tsv",response);
      this.setState({
        countries : response
      })
    })
  }

  render() {
    var mediaFrancaisView = this.constructView()
    return (
      <div>
        {mediaFrancaisView}
      </div>
    );

  }

  constructView = () => {
    const { worldData, jsonData,countries} = this.state;
    if(jsonData.length!=0){
     return (
        <CoronaMapView
          worldData={worldData}
          jsonData={jsonData}
          activated={true}
          countries = {countries}
        ></CoronaMapView>
      );
    }
    return <div></div>
  };

}

export default MediaFrancaisContainer;
