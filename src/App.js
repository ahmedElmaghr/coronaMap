import * as d3 from "d3";
import React, { Component } from "react";
import "./App.css";
import Card from "./Components/card/Card";
import TableComponent from "./Components/table/TableComponent";
import Container from "./coronadash/container/Container";
import data from "./scrapping/results_coronavirus.csv";
import DateHelper from "./Utils/DateHelper";
import StringUtils from "./Utils/StringUtils";

export default class App extends Component {
                 constructor() {
                   super();

                   this.state = {
                     dataset: {},
                     isLoaded: false,
                     names: []
                   };
                 }

                 onAddClick(name, nickname) {
                  let updated = false;
                  const result = this.state.names.map((nameData) => {
                      if (nameData.name === name) {
                          updated = true;
                          return {name, nickname}
                      }
                      return nameData;
                  });
                  if (!updated) {
                      result.push({name, nickname});
                  }
          
                  this.setState({
                      names: result
                  })
              }

                 componentDidMount() {
                   var todelete = ["\nNorth America\n","\nEurope\n","\nSouth America\n","\nAsia\n","\nAfrica\n","\nOceania\n","\n\n","Western Sahara"]
                   d3.csv(data)
                     .then((data) => {
                       this.setState({
                         dataset: data.filter((d) => {
                           return !todelete.includes(d.Country);
                         }),
                         isLoaded: true,
                       });
                     })
                     .catch((err) => {
                       throw err;
                     });
                 }

                 readData = () => {
                   d3.csv(data)
                     .then((data) => {
                       this.setState({
                         dataset: data,
                       });
                     })
                     .catch(function (err) {
                       throw err;
                     });
                 };
                 render() {
                   if (!this.state.isLoaded) {
                     return "";
                   }

                   return (
                     <div class="myWrapper">
                       <div className="container-fluid app-container">
                         <div id="header" className="row header-text">
                           <h1 className="title1">
                             Mapping the Coronavirus Outbreak
                           </h1>
                           <h2 className="title2">
                             Get daily updates on the epidemic and learn how it
                             is affecting countries around the world.
                           </h2>
                         </div>
                         <div className="col cards ">
                           <h2
                             style={{
                               fontFamily: "Arial,sans serif",
                               fontSize: 1 + "rem",
                               fontWeight: "bold",
                             }}
                           >
                             last update : {this.getUpdatedDate()}
                           </h2>
                           <Card
                             covid19={this.structureData(this.state.dataset)}
                             countryClicked={this.state.countryClicked}
                           ></Card>
                           <h1>Coronavirus map</h1>
                           <p>Source:WHO, CDC, NHC via worldometer.</p>
                           <div style={{ width: 100 + "%" }}>
                             <div
                               className="legend-elt"
                               style={{ color: "#881B1B" }}
                             >
                                active cases &gt; 10,000
                             </div>
                             <div
                               className="legend-elt"
                               style={{ color: "#EB9999" }}
                             >
                                active cases &gt; 1,000
                             </div>
                             <div
                               className="legend-elt"
                               style={{ color: "#E3E363" }}
                             >
                               active cases &lt; 1000
                             </div>
                             <div
                               className="legend-elt"
                               style={{ color: "green" }}
                             >
                               No infected cases
                             </div>
                           </div>
                         </div>
                         <div className="">
                           <div
                             id="mapWW"
                             className="col "
                             style={{ top: 15 + "%" }}
                           >
                             <Container
                              //  covid19={this.state.dataset}
                               covid19={this.structureData(this.state.dataset)}
                               onclick={(d) => this.onclickCountry(d)}
                               initGlobalStat={() => {
                                 this.initGlobalStat();
                               }}
                             ></Container>
                           </div>
                           <TableComponent
                             data={this.structureData(this.state.dataset)}
                           ></TableComponent>

                           {/* <div >
          <PieChart
                opacity={1}
                zIndex={1}
                data={this.getGlobalStat(this.state.dataset)}
                countryClicked={this.state.countryClicked}
                // data={this.getPieData(this.getGlobalStat(this.state.dataset))}
                x={85}
                y={100}
              ></PieChart>
          </div> */}
                         </div>

                         <div className="footer">
                           {/* {lastupdate}
          <br></br> */}
                           <i
                             class="fa fa-github-square"
                             aria-hidden="true"
                           ></i>
                           <a
                             href="https://github.com/ahmedElmaghr/coronaMap.git"
                             className="github-link"
                             style={{ color: "white" }}
                           >
                             {" "}
                             github repository
                           </a>
                         </div>
                       </div>
                     </div>
                   );
                 }
                 structureData = (data) => {
                   var allData = [];
                   var todayData = [];
                   var lastDayData = [];
                   if (data) {
                     //Filter data
                     var dataFiltered = data;
                     
                     //Construct data
                     dataFiltered.forEach((elt1) => {
                       var countryData = dataFiltered.filter((elt2) => {
                         return elt1.Country == elt2.Country;
                       });
                       var todayCountryData = countryData[0];
                       var lastdayCountryData = countryData[1];

                       if (!todayData.includes(todayCountryData)) {
                         todayData.push(todayCountryData);
                       }
                       if (!lastDayData.includes(lastdayCountryData)) {
                         lastDayData.push(lastdayCountryData);
                       }
                       allData = { todayData, lastDayData };
                     });
                     return allData;
                   }
                   return data;
                 };
                 keywords = [
                   "World",
                   "\nNorth America\n",
                   "North America",
                   "\nEurope\n",
                   "Europe",
                   "\nAsia\n",
                   "Asia",
                   "\nSouth America\n",
                   "South America",
                   "\nOceania\n",
                   "Oceania",
                   "Africa",
                   "\n\n",
                   "Total:",
                 ];
                 getUpdatedDate = () => {
                   "MARCH 4, 2020, 1:00 AM";
                   var today = new Date();
                   var dd = today.getUTCDate();
                   var mounth = today.getMonth(); //January is 0!
                   var yyyy = today.getFullYear();
                   var mm2 = 30;
                   if (
                     0 <= today.getUTCMinutes() &&
                     today.getUTCMinutes() < 30
                   ) {
                     mm2 = 0;
                   }
                   var hours = today.getHours();
                   var ampm = hours >= 12 ? "pm" : "AM";
                   var time =
                     String(hours).padStart(2, "0") +
                     ":" +
                     String(mm2).padStart(2, "0") +
                     " " +
                     ampm;
                   today =
                     DateHelper.MONTHS(mounth) +
                     " " +
                     dd +
                     "," +
                     yyyy +
                     " " +
                     time;
                   return today;
                 };
                 onclickCountry = (d) => {
                   var dataset = this.state.dataset;
                   var countryFiltered;
                   if (!d) {
                     countryFiltered = dataset.filter((elt) => {
                       return elt.Country == "Morocco";
                     });
                   } else {
                     countryFiltered = dataset.filter((elt) => {
                       return elt.Country == d.properties.name;
                     });
                   }
                   this.setState({
                     countryClicked: countryFiltered[0],
                   });
                 };

                 getPieData = (data) => {
                   if (data) {
                     let totalCases = StringUtils.deleteSpecialChar(
                       data.TotalCases
                     );
                     let totalRecovered = StringUtils.deleteSpecialChar(
                       data.TotalRecovered
                     );
                     let totalDeaths = StringUtils.deleteSpecialChar(
                       data.TotalDeaths
                     );
                     return [totalRecovered, totalCases, totalDeaths];
                   } else {
                     return [0];
                   }
                 };

                 getGlobalStat = (data) => {
                   let totalStatistics;
                   if (Array.isArray(data) && data.length) {
                     //FIXME : refactor this code
                     totalStatistics = data.filter((elt) => {
                       return elt.Country == "World";
                     })[0];
                   }
                   return totalStatistics;
                 };

                 initGlobalStat = () => {
                   this.setState({
                     countryClicked: undefined,
                   });
                 };
               }
