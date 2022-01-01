
const URL_DATA_YESTERDAY : string = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
const URL_DATA_TODAY : string = "https://corona.lmao.ninja/v2/countries?today&sort";

export const getYesterDayCovidData  = ()=>{
        return fetch(URL_DATA_YESTERDAY).then((data)=>{
            return data.json();
        })
    }

    export const getTodayCovidData = ()=>{
        fetch(URL_DATA_TODAY).then((data)=>{
            return data.json();
        }).then( (json)=>{
            console.log("getTodayCovidData",json);
        })
    }