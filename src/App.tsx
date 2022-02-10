import React, { Component } from "react";
import Loading from './../src/components/loading/loading';
import "./App.css";
import { withDataLoader } from "./components/hoc/withDataLoader";
import { CountryDailyInfo } from "./models/CountryDailyInfo";
import { TotalInfo } from "./models/TotalInfo";
import { Footer } from "./pages/footer/footer";
import { Header } from "./pages/header/header";
import { Navigation } from "./routes/navigation";

interface Props{
  active : boolean;
  allCoutriesDailyinfo : CountryDailyInfo[];
  totalInfo : TotalInfo;
}

 class App extends Component<Props,Readonly<{}>> {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div
        className="container-fluid"
      >
        <div id="header" className="row" style={{margin:0}}>
          <Header />
        </div>
        <div className="main">
          <Loading active={this.props.active} />
          <Navigation dataset={this.props.allCoutriesDailyinfo} totalInfo={this.props.totalInfo} />
        </div>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    );
  }
}
export default withDataLoader(App);
