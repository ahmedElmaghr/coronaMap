const URL_HOST = 'https://disease.sh';
const URL_DATA_TODAY : string = URL_HOST+"/v2/countries?today&sort";
const URL_DATA_TODAY_TOTAL : string = URL_HOST+"/v2/all?today";
const URL_HIST_DATA : string = URL_HOST+'/v3/covid-19/historical';//ma?lastdays=1


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

    export const getHistoricalDataByCountryAndPeriod  = (countryName : string,period?: number)=>{
        let url : string = URL_HIST_DATA+'/'+countryName + (period? '?lastdays='+period : '');
        return fetch(url).then((data)=>{
            return data.json();
        })
    }

    export const getGlobalHistoricalDataByPeriod  = (period: number)=>{
        let url : string = URL_HIST_DATA+'/all' + (period? '?lastdays='+period : '');
        return fetch(url).then((data)=>{
            return data.json();
        })
    }