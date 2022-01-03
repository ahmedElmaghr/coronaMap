
const URL_DATA_YESTERDAY : string = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
const URL_DATA_TODAY : string = "https://corona.lmao.ninja/v2/countries?today&sort";
const URL_DATA_TODAY_TOTAL : string = "https://corona.lmao.ninja/v2/all?today";

    export const getYesterDayCovidData  = ()=>{
        return fetch(URL_DATA_YESTERDAY).then((data)=>{
            return data.json();
        })
    }

    export const getTodayCovidData = ()=>{
        return fetch(URL_DATA_TODAY).then((data)=>{
            return data.json();
        })
    }

    export const getTodayTotalCovidData  = ()=>{
        return fetch(URL_DATA_TODAY_TOTAL).then((data)=>{
            return data.json();
        })
    }