
import React from 'react'
import StringUtils from './StringUtils'
import CountUp from 'react-countup';

/** example "16.25" -> 16,25 + counter  */
const buildCountUpByStringValue = (valueStr)=>{
    return (
       
      <CountUp
        separator=","
        duration=".1"
        end={StringUtils.stringVirSepToNumber(valueStr)}
      ></CountUp>
    );
  }

const   calculateRadius = (d, context) => {
  let cases;
  if (context.checkZoneDeaths) {
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
  }else if(100000 <= cases && cases < 150000){
    let r = (cases / 150000) * 70;
    rayon = r;
  }else if(150000 <= cases && cases < 200000){
    let r = (cases / 200000) * 80;
    rayon = r;
  }else if(200000 <= cases && cases < 500000){
    let r = (cases / 500000) * 90;
    rayon = r;
  }else if(500000 <= cases && cases < 1000000){
    let r = (cases / 1000000) * 200;
    rayon = r;
  }
  
  return rayon < 4 && rayon > 0 ? 4 : rayon;
}

const getRadiusDeath = (cases)=>{
  let rayon = 0;
  if (0 <= cases && cases < 1000) {
    let r = (cases / 1000) * 5;
    rayon = r;
  } else if (1000 <= cases && cases < 2000) {
    let r = (cases / 2000) * 15;
    rayon = r;
  } else if (2000 <= cases && cases < 5000) {
    let r = (cases / 5000) * 25;
    rayon = r;
  } else if (5000 <= cases && cases < 20000) {
    let r = (cases / 20000) * 30;
    rayon = r;
  }else if (20000 <= cases && cases < 30000) {
    let r = (cases / 30000) * 45;
    rayon = r;
    }
  
  return rayon < 1 && rayon > 0 ? 4 : rayon;
}

export default{buildCountUpByStringValue,calculateRadius}