import React, { Component } from "react";
import "./App.css";
import { Footer } from "./pages/footer/footer";
import { Header } from "./pages/header/header";
import { Router } from "./routes/router";
import { getTodayCovidData, getTodayTotalCovidData } from "./services/covidNinja/NinjaService";

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataset: {},
      totalInfo: {},
      isDataLoaded:false
    };
  }


  componentDidMount() {
    let dataset = {};
    getTodayCovidData().then((response) => {
      dataset = response.filter((d) => {
        return d.country != "Western Sahara";
      });
      getTodayTotalCovidData().then((response) => {
        this.setState({
          dataset,
          totalInfo: response,
          isDataLoaded: true,
        });
      });
    });
  }

  render() {
    if (!this.state.isDataLoaded) {
      return "";
    }
    console.log("App render");
    console.log("v104");
    return (
      <div
        className="container-fluid"
        style={{ overflow: "auto", height: "1500px" }}
      >
        <div id="header" className="row">
          <Header />
        </div>
        <div>
          <Router dataset={this.state.dataset} totalInfo={this.state.totalInfo}/>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}
