import React, { Component } from "react";
import "./App.css";
import { CountryDailyInfo } from "./models/CountryDailyInfo";
import { TotalInfo } from "./models/TotalInfo";
import { Footer } from "./pages/footer/footer";
import { Header } from "./pages/header/header";
import { Navigation } from "./routes/navigation";
import { getTodayCovidData, getTodayTotalCovidData } from "./services/covidNinja/NinjaService";
import { jsonConvert, WS_ISO2 } from "./utils/Constants";

interface State {
  allCoutriesDailyinfo: CountryDailyInfo[];
  totalInfo: TotalInfo;
  isDataLoaded: boolean;
}

export default class App extends Component<Readonly<{}>,State> {
  
  constructor(props ) {
    super(props);
    this.state = {
      ...this.state,
      isDataLoaded: false
    };
  }


  componentDidMount() {
    getTodayCovidData().then((response) => {
      let allDataExceptWS = response.filter((d : CountryDailyInfo) => {
        return d.countryInfo.iso2 !== WS_ISO2;
      });
      let allCoutriesDailyinfo : CountryDailyInfo[] = jsonConvert().deserializeArray(allDataExceptWS, CountryDailyInfo);
      getTodayTotalCovidData().then((response) => {
        let totalInfo : TotalInfo = jsonConvert().deserializeObject(response, TotalInfo);
        this.setState({
          allCoutriesDailyinfo,
          totalInfo,
          isDataLoaded: true,
        });
      });
    });
  }

  render(){
    if (!this.state.isDataLoaded) {
      return "";
    }
    console.log("App render");
    return (
      <div
        className="container-fluid"
      >
        <div id="header" className="row">
          <Header />
        </div>
        <div className="main">
          <Navigation dataset={this.state.allCoutriesDailyinfo} totalInfo={this.state.totalInfo}/>
        </div>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    );
  }
}
