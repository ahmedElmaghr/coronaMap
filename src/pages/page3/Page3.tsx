import * as React from "react";
import { BarChart } from "../../components/barChart/BarChart";
import { SelectRange } from "../../components/select/Select";
import { SelectOptions } from "../../dto/selectOptions";
import { HistoricalCountry } from '../../models/historical/HistoricalCountry';
import { getHistoricalDataByCountryAndPeriod } from '../../services/covidNinja/NinjaService';
import { jsonConvert } from '../../utils/Constants';
import './Page3.css';
interface State {
    countryHistoricalData : HistoricalCountry;
    loaded : boolean;
}
interface Props{
    countriesRef : SelectOptions[];
}
enum DailyNewsTypes{
    DEATHS="deaths",
    CASES="cases",
    RECOVERED = "recovered"
}
export class Page3 extends React.Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            loaded: false
        }
    }

    componentDidMount(){
        let interval = 365*2;
        getHistoricalDataByCountryAndPeriod('ma',interval).then((response)=>{
            let countryHistoricalData : HistoricalCountry = jsonConvert().deserializeObject(response, HistoricalCountry);
                    this.setState({
                        ...this.state,
                        countryHistoricalData: countryHistoricalData,
                        loaded:true
            })
        })
    }

    getOptions = (graphTitle : string) => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: graphTitle,
                },
            },
        };
    };


    getLabels = ()=>{
        let data : HistoricalCountry = this.state.countryHistoricalData;
        let casesAsMAp = new Map(Object.entries(data.timeline.cases));    
        let labels = [ ...casesAsMAp.keys() ];
        return labels;
    }

    getCountryDeathsData = ()=>{
        //morocco
        let maHistData : HistoricalCountry = this.state.countryHistoricalData;
        let countryDeathsAsMap = new Map(Object.entries(maHistData.timeline.deaths));
        let countryDeaths = [ ...countryDeathsAsMap.values()];

        //TODO
        let countryDeathsPerDay = countryDeaths.map((v,i,array)=>{
            return i>0 ? Math.abs(v - array[i - 1]) : 0;
        })
        console.log(countryDeathsPerDay)
        let data = {
            labels: this.getLabels(),
            datasets: [
                {
                    label: 'deaths',
                    data: countryDeathsPerDay,//tnValuePerDay
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };
        return data;
    }

    getCountryCasesData = ()=>{
        //country hist data
        let countryHistData : HistoricalCountry = this.state.countryHistoricalData;
        let countryCasesAsMap = new Map(Object.entries(countryHistData.timeline.cases));   
        let countryCases = [ ...countryCasesAsMap.values()];
        //TODO
        let countryCasesPerDay = countryCases.map((v,i,array)=>{
            return i>0 ? Math.abs(v - array[i - 1]) : 0;
        })
        

        let data = {
            labels: this.getLabels(),
            datasets: [
                {
                    label: 'cases',
                    data: countryCasesPerDay,//maValuePerDay
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };
        return data;
    }

    getTotalDataByType = (_x:DailyNewsTypes)=>{
        //morocco
        let countryHistData : HistoricalCountry = this.state.countryHistoricalData;
        let countryDeathsAsMap = new Map(Object.entries(countryHistData.timeline[_x]));   
        let countryDeathsValues = [ ...countryDeathsAsMap.values()];

        let data = {
            labels: this.getLabels(),
            datasets: [
                {
                    label: 'country total '+(_x==DailyNewsTypes.DEATHS?'deaths':'cases')+' per day',
                    data: countryDeathsValues,//maValuePerDay
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };
        return data;
    }
    handleChangeSelect = (e : SelectOptions)=>{
        let interval = 365*3;
        getHistoricalDataByCountryAndPeriod(e.value,interval).then((response)=>{
            let countryHistoricalData : HistoricalCountry = jsonConvert().deserializeObject(response, HistoricalCountry);
                    this.setState({
                        ...this.state,
                        countryHistoricalData,
                        loaded:true
            })
        })
    }
    render() {
        if(!this.state.loaded){
            return null;
        }
        return (
            <div className='container'>
                
                <div className='row'>
                    <div className="select" >
                        <SelectRange
                            options={this.props.countriesRef}
                            onChange={(e) => this.handleChangeSelect(e as SelectOptions)} 
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <BarChart options={this.getOptions("country cases evolution")} data={this.getCountryCasesData()}/>
                    </div>
                    <div className='col-6'>
                        <BarChart options={this.getOptions("country deaths evolution")} data={this.getCountryDeathsData()}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <BarChart options={this.getOptions("country cases accumulation")} data={this.getTotalDataByType(DailyNewsTypes.CASES)}/>
                    </div>
                    <div className='col-6'>
                        <BarChart options={this.getOptions("country deaths accumulation")} data={this.getTotalDataByType(DailyNewsTypes.DEATHS)}/>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">

                    </div>
                </div>
            </div>
        )
    }


    //Legacy
    getTotalCasesData = ()=>{
        //morocco
        let maHistData : HistoricalCountry = this.state.countryHistoricalData;
        let maCasesAsMap = new Map(Object.entries(maHistData.timeline.cases));   
        let keys = [ ...maCasesAsMap.keys()];//common
        let maValues = [ ...maCasesAsMap.values()];

        //TODO
        let maValuePerDay = maValues.map((v,i,array)=>{
            return i>0 ? v - array[i - 1] : 0;
        })

        let data = {
            labels: this.getLabels(),
            datasets: [
                {
                    label: 'Morocco cases per day',
                    data: maValues,//maValuePerDay
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };
        return data;
    }
}