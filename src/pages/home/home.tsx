import * as React from "react";
import Cards from "../../components/card/Cards";
import { TotalInfo } from "../../models/TotalInfo";
import './home.css';


interface Props {
  totalInfo: TotalInfo;
}
interface State {
}
export class Home extends React.Component<Props, State>{

  constructor(props) {
    super(props);
  }

  getPieData = (data: TotalInfo) => {
    if (data) {
      let totalCases = data.cases;
      let totalRecovered = data.recovered;
      let totalDeaths = data.deaths;
      return [totalRecovered, totalCases, totalDeaths];
    } else {
      return [0];
    }
  };

  render() {

    let pieData;
    pieData = this.getPieData(this.props.totalInfo);

    return (
      <>
        <div className="home">
          <div className="row">
            <div className="col-6 panels">
              <Cards
                totalInfo={this.props.totalInfo}
              ></Cards>
            </div>
          </div>
          <div className="row" style={{display:"flex"}}>
            <div className="col-8" style={{flex:1}}>
            </div>
            <div className="col-8" style={{flex:1,textAlign:"center"}}>
              Shortcut map
              {/* <img src=""></img> */}
            </div>
          </div>
        </div>
      </>
    )
  }

}



          {/* <div
            className="row pie-container">
            <div className="pie">
              <PieChartFullOption
                data={[
                  { title: "Recovered", value: parseInt(pieData[0]), color: "rgb(44, 100, 6)" },
                  { title: "Cases", value: parseInt(pieData[1]), color: "rgb(201, 93, 22)" },
                  { title: "Deaths", value: parseInt(pieData[2]), color: "rgb(0, 0, 0)" },
                ]}
              />
            </div>
          </div> */}