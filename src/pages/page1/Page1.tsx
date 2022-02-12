import * as React from "react";
import CoronaMapView from "../../components/coronadash/mapD3/CoronaMapView";
import { CountryDailyInfo } from "../../models/CountryDailyInfo";
import { TotalInfo } from "../../models/TotalInfo";
import './page1.css';


interface Props {
  dataset: CountryDailyInfo[];
  totalInfo: TotalInfo;
}
interface State {
  countryClicked: any;
}
export class Page1 extends React.Component<Props, State>{

  constructor(props) {
    super(props);
    this.state = {
      countryClicked: undefined,
    };
  }

  render() {
    return (
      <div className="row">

        <CoronaMapView
          covid19={this.props.dataset}
          onMouseMoveOverCountry={(d) => this.onMouseMoveOverCountry(d)}
          initGlobalStat={() => {
            this.initGlobalStat();
          }}
        />

        {/* <Container
            covid19={this.props.dataset}
            onMouseMoveOverCountry={(d) => this.onMouseMoveOverCountry(d)}
            initGlobalStat={() => {
              this.initGlobalStat();
            }}
          ></Container> */}
      </div>
    )
  }

  onMouseMoveOverCountry = (d) => {
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