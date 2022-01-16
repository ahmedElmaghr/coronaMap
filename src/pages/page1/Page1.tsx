import * as React from "react";
import './page1.css'
import Card from "../../components/card/Card";
import Container from "../../components/coronadash/container/Container";
import PieChartFullOption from "../../components/pieChart/PieChartFullOption";


interface Props {
  dataset: any;
  totalInfo: any;
}
interface State {
  countryClicked: any;
}
export class Page1 extends React.Component<Props, State>{
  
  constructor(props) {
    super(props);
    this.state = {
      countryClicked : undefined,
    };
  }
  
  render() {

    let pieData;
    if (this.state.countryClicked) {
      pieData = this.getPieData(this.state.countryClicked);
    } else {
      pieData = this.getPieData(this.getGlobalStat(this.props.dataset));
    }

    return (
      <div className="row">
        <div
          id="leftside"
          className="col-2 leftside"
          style={{
            paddingRight: 0 + "px",
            height: window.screen.height + "px",
          }}
        >
          <div className="row cards">
            <Card
              covid19={this.props.dataset}
              totalInfo={this.props.totalInfo}
              countryClicked={this.state.countryClicked}
            ></Card>
          </div>
          <div
            className="row statistics"
            style={{
              overflow: "hidden",
              width: "auto",
              height: "auto",
            }}
          >
            <PieChartFullOption
              data={[
                { title: "total recovered", value: parseInt(pieData[0]), color: "rgb(44, 100, 6)" },
                { title: "total cases", value: parseInt(pieData[1]), color: "rgb(201, 93, 22)" },
                { title: "total deaths", value: parseInt(pieData[2]), color: "rgb(0, 0, 0)" },
              ]}
              countryClicked={this.state && this.state.countryClicked}
            />
          </div>
        </div>
        <div
          className="col-10"
          style={{ height: window.screen.height + "px" }}
        >
          <div id="mapWW" className="col">
            <Container
              covid19={this.props.dataset}
              onclick={(d) => this.onclickCountry(d)}
              initGlobalStat={() => {
                this.initGlobalStat();
              }}
            ></Container>
          </div>
        </div>
      </div>
    )
  }

  clickPrevious() {
  }

  clickNext() {
  }

  getPieData = data => {
    if (data) {
      let totalCases = data.cases;
      let totalRecovered = data.recovered;
      let totalDeaths = data.deaths;
      return [totalRecovered, totalCases, totalDeaths];
    } else {
      return [0];
    }
  };

  getGlobalStat = data => {
    let totalStatistics;
    if (Array.isArray(data) && data.length) {
      //FIXME : refactor this code
      totalStatistics = data.filter(elt => {
        return elt.country == "Morocco";
      })[0];
    }
    return totalStatistics;
  };

  onclickCountry = (d) => {
    var dataset = this.props.dataset;
    var countryFiltered;
    if (!d) {
      countryFiltered = dataset.filter((elt) => {
        return elt.country == "Morocco";
      })
    } else {
      countryFiltered = dataset.filter((elt) => {
        return elt.country == d.properties.name;
      })
    }
    this.setState({
      countryClicked: countryFiltered[0]
    })
  }


  initGlobalStat = () => {
    this.setState({
      countryClicked: undefined
    })
  }
}