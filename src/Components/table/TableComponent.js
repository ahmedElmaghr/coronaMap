import React, { Component } from "react";
import "./TableComponent.css";
class TableComponent extends Component {
  render() {
    const { data } = this.props;
    var dataFiltered = data.todayData.slice(0 ,data.todayData.length);
    return (
      <div className="table-container">
        <h1 className='countryTableTitle'>Reported cases by country</h1>
        <table class="table" style={{ height: 150 + "px" }}>
          <thead className="thead-light">
            <tr>
              <th scope="col">Country</th>
              <th scope="col">Cases</th>
              <th scope="col">Deaths</th>
              <th scope="col">Recovered</th>
              <th scope="col">Test</th>
              <th scope="col">Test/1M People</th>
              <th scope="col">Deaths/1M People</th>
            </tr>
          </thead>
          <tbody>
            {dataFiltered.map((element, i) => {
              return (
                <tr key={i}>
                  <td>{element.Country}</td>
                  <td>
                    {element.TotalCases}
                    {element.NewCases && (
                      <h className="counter2">({element.NewCases})</h>
                    )}
                  </td>
                  <td>
                    {element.TotalDeaths}
                    {element.NewDeaths && (
                      <h className="counter2">({element.NewDeaths})</h>
                    )}
                  </td>
                  <td>{element.TotalRecovered}</td>
                  <td>{element.TotalTest}</td>
                  <td>{element.Test1MPeople}</td>
                  <td>{element.Death1m}</td>
                </tr>
              );
            })}
            {/* <tr>
            <th scope="row">1</th>
              <td>Morocco</td>
              <td>1867</td>
              <td>143</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableComponent;
