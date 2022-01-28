import * as React from "react";
import Container from "../../components/coronadash/container/Container";
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
        <div id="mapWW" className="col" style={{ height: window.screen.height + "px" }}>
          <Container
            covid19={this.props.dataset}
            onMouseMoveOverCountry={(d) => this.onMouseMoveOverCountry(d)}
            initGlobalStat={() => {
              this.initGlobalStat();
            }}
          ></Container>
        </div>
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