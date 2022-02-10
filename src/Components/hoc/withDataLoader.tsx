import React, { useEffect, useMemo, useState } from "react";
import { CountryDailyInfo } from "../../models/CountryDailyInfo";
import { TotalInfo } from "../../models/TotalInfo";
import { getTodayCovidData, getTodayTotalCovidData } from "../../services/covidNinja/NinjaService";
import { jsonConvert, WS_ISO2 } from "../../utils/Constants";

export const withDataLoader = (Component) => (props) => {

  const [active, setActive] = useState(true);
  const [allCoutriesDailyinfo, setAllCoutriesDailyinfo] = useState(new Array<CountryDailyInfo>());
  const [totalInfo, setTotalInfo] = useState(new TotalInfo());
  
  //add logic
  useEffect(() => {
    getTodayCovidData().then((response) => {
      let allDataExceptWS = response.filter((d: CountryDailyInfo) => {
        return d.countryInfo.iso2 !== WS_ISO2;
      });
      let allCoutriesDailyinfo: CountryDailyInfo[] = jsonConvert().deserializeArray(allDataExceptWS, CountryDailyInfo);
      getTodayTotalCovidData().then((response) => {
        let totalInfo: TotalInfo = jsonConvert().deserializeObject(response, TotalInfo);
        setAllCoutriesDailyinfo(allCoutriesDailyinfo);
        setTotalInfo(totalInfo);
        setActive(false);
      });
    })
  }, [active]);

  return <Component active={active} allCoutriesDailyinfo={allCoutriesDailyinfo} totalInfo={totalInfo} />
};
