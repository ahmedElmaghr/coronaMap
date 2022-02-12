import React, { useEffect, useState } from "react";
import { feature } from "topojson-client";
import countries110 from "../../countries-110m.json";

const withTopologicalData = (WrappedComponent) => (props) => {
  const [worldData, setWorldData] = useState([]);
  const [jsonData, setJsonData] = useState({});


  useEffect(() => {
    setWorldData(feature(countries110, countries110.objects.countries).features);
    setJsonData(countries110);
  }, []);

  return (
    <>
      {(Object.keys(jsonData).length != 0 && props.covid19)  &&
        <WrappedComponent
          worldData={worldData}
          jsonData={jsonData}
          covid19={props.covid19}
          initGlobalStat={props.initGlobalStat}
        ></WrappedComponent>
      }
    </>
  )
}

export default withTopologicalData;
