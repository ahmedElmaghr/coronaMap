import * as React from "react";
import { format, endOfToday, set } from "date-fns";
import { BarChart } from "../../components/barChart/BarChart";
import { TimeRangePicker } from "../../components/coronadash/timeRange/TimeRangePicker";
import { SelectRange } from "../../components/select/Select";
import { SelectOptions } from "../../dto/selectOptions";
import { HistoricalCountry } from '../../models/historical/HistoricalCountry';
import { getHistoricalDataByCountryAndPeriod } from '../../services/covidNinja/NinjaService';
import { jsonConvert } from '../../utils/Constants';
import './Page3.css';
interface State {
    countryHistoricalData: HistoricalCountry;
    loaded: boolean;
    selectedInterval: [Date, Date]
}
interface Props {
    countriesRef: SelectOptions[];
}
enum DailyNewsTypes {
    DEATHS = "deaths",
    CASES = "cases",
    RECOVERED = "recovered"
}
const firstCovidDate = new Date(2019, 10, 1, 0, 0, 0, 0);
const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

const selectedStartInit = new Date(2021, 0, 25, 0, 0, 0, 0);//getTodayAtSpecificHour(8);
const selectedEndInit = new Date();//getTodayAtSpecificHour(16);

const startTime = firstCovidDate;//getTodayAtSpecificHour(7)
const endTime = new Date();//endOfToday()
export class Page3 extends React.Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            loaded: false,
            selectedInterval: [selectedStartInit, selectedEndInit]
        }
    }

    componentDidMount() {
        let interval = 365 * 3;
        getHistoricalDataByCountryAndPeriod('ma', interval).then((response) => {
            let countryHistoricalData: HistoricalCountry = jsonConvert().deserializeObject(response, HistoricalCountry);
            this.setState({
                ...this.state,
                countryHistoricalData: countryHistoricalData,
                loaded: true
            })
        })
    }

    getOptions = (graphTitle: string) => {
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


    getLabels = () => {
        //period
        let startDate = this.state.selectedInterval[0];
        let endDate = this.state.selectedInterval[1];
        //data
        let data: HistoricalCountry = this.state.countryHistoricalData;
        let casesAsMAp = new Map(Object.entries(data.timeline.cases));

        let labels = [...casesAsMAp.keys()].filter(it => {
            let itAsDate = new Date(it);
            return (itAsDate >= startDate && itAsDate <= endDate)
        });
        return labels;
    }

    getDailyDataByType = (_x: DailyNewsTypes) => {
        //period 
        let startDate = this.state.selectedInterval[0];
        let endDate = this.state.selectedInterval[1];
        //country hist data
        let countryHistData: HistoricalCountry = this.state.countryHistoricalData;
        let countryDailyDataAsMap = new Map(Object.entries(countryHistData.timeline[_x]));
        let countryDailyDataByPeriod = [...countryDailyDataAsMap].filter(it => {
            let itAsDate = new Date(it[0]);
            return (itAsDate >= startDate && itAsDate <= endDate)
        })
        let countryDailyData = countryDailyDataByPeriod.map((it)=> it[1]);
        //TODO
        let countryDataPerDay = countryDailyData.map((v, i, array) => {
            return i > 0 ? Math.abs(v - array[i - 1]) : 0;
        })


        let data = {
            labels: this.getLabels(),
            datasets: [
                {
                    label: (_x == DailyNewsTypes.CASES ? 'cases' : 'deaths'),
                    data: countryDataPerDay,//valuePerDay
                    borderColor: (_x == DailyNewsTypes.CASES ? 'rgb(255, 99, 132)' : 'rgb(53, 162, 235)'),
                    backgroundColor: (_x == DailyNewsTypes.CASES ? 'rgba(255, 99, 132, 0.5)' : 'rgba(53, 162, 235, 0.5)'),
                }
            ],
        };
        return data;
    }

    getTotalDataByType = (_x: DailyNewsTypes) => {
        //morocco
        let countryHistData: HistoricalCountry = this.state.countryHistoricalData;
        let countryDeathsAsMap = new Map(Object.entries(countryHistData.timeline[_x]));
        let countryDeathsValues = [...countryDeathsAsMap.values()];

        let data = {
            labels: this.getLabels(),
            datasets: [
                {
                    label: 'country total ' + (_x == DailyNewsTypes.DEATHS ? 'deaths' : 'cases') + ' per day',
                    data: countryDeathsValues,//maValuePerDay
                    borderColor: (_x == DailyNewsTypes.DEATHS ? 'rgb(53, 162, 235)' : 'rgb(255, 99, 132)'),
                    backgroundColor: (_x == DailyNewsTypes.DEATHS ? 'rgba(53, 162, 235, 0.5)' : 'rgba(255, 99, 132, 0.5)'),
                },
            ],
        };
        return data;
    }
    handleChangeSelect = (e: SelectOptions) => {
        let interval = 365 * 3;
        getHistoricalDataByCountryAndPeriod(e.value, interval).then((response) => {
            let countryHistoricalData: HistoricalCountry = jsonConvert().deserializeObject(response, HistoricalCountry);
            this.setState({
                ...this.state,
                countryHistoricalData,
                loaded: true
            })
        })
    }

    countDaysFromStartDay = (startDate: Date) => {
        let date1: Date = new Date();
        let timeInMilisec: number = date1.getTime() - startDate.getTime();
        let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
        return daysBetweenDates;
    }

    updateTimeRange = (selectedInterval) => {
        this.setState({
            ...this.state,
            selectedInterval
        })
    }

    render() {
        if (!this.state.loaded) {
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
                        <BarChart options={this.getOptions("country cases evolution")} data={this.getDailyDataByType(DailyNewsTypes.CASES)} />
                    </div>
                    <div className='col-6'>
                        <BarChart options={this.getOptions("country deaths evolution")} data={this.getDailyDataByType(DailyNewsTypes.DEATHS)} />
                    </div>
                </div>
                <div>
                    <TimeRangePicker
                        startTime={startTime}
                        endTime={endTime}
                        selectedInterval={this.state.selectedInterval}
                        updateTimeRange={(e) => this.updateTimeRange(e)}
                    />
                </div>
            </div>
        )
    }
}