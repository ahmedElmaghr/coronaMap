
import React from 'react'
import StringUtils from './StringUtils'
import CountUp from 'react-countup';

/** example "16.25" -> 16,25 + counter  */
const buildCountUpByStringValue = (valueStr)=>{
    return (
      <CountUp
        // separator=" "
        end={StringUtils.stringVirSepToNumber(valueStr)}
      ></CountUp>
    );
  }

const   calculateRadius = (d, context) => {
  let cases;
  if (context.checkToggleBTn) {
    cases = StringUtils.deleteSpecialChar(d.stat.TotalDeaths);
    return getRadiusDeath(cases)
  } else if (context.checkZoneDesease) {
    cases = StringUtils.deleteSpecialChar(d.stat.ActiveCases);
    return getRadiusCases(cases)
  }
};

const getRadiusCases = (cases)=>{
  let rayon = 0;
  if (0 <= cases && cases < 1000) {
    let r = (cases / 1000) * 5;
    rayon = r;
  } else if (1000 <= cases && cases < 5000) {
    let r = (cases / 5000) * 10;
    rayon = r;
  } else if (5000 <= cases && cases < 10000) {
    let r = (cases / 10000) * 20;
    rayon = r;
  } else if (10000 <= cases && cases < 60000) {
    let r = (cases / 50000) * 50;
    rayon = r;
  }else if (60000 <= cases && cases < 100000) {
    let r = (cases / 100000) * 60;
    rayon = r;
  }
  
  return rayon < 1 && rayon > 0 ? 2 : rayon;
}

const getRadiusDeath = (cases)=>{
  let rayon = 0;
  if (0 <= cases && cases < 1000) {
    let r = (cases / 1000) * 10;
    rayon = r;
  } else if (1000 <= cases && cases < 2000) {
    let r = (cases / 2000) * 30;
    rayon = r;
  } else if (2000 <= cases && cases < 5000) {
    let r = (cases / 5000) * 40;
    rayon = r;
  } else if (5000 <= cases && cases < 15000) {
    let r = (cases / 5000) * 45;
    rayon = r;
  }
  
  return rayon < 1 && rayon > 0 ? 2 : rayon;
}

export default{buildCountUpByStringValue,calculateRadius}