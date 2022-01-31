import { format, endOfToday, set } from "date-fns";
import * as React from "react";
import TimeRange from "react-timeline-range-slider";
import './time-range-picker.css';

const step = 86400000;//1 day in milliseconds
interface Props {
    updateTimeRange: any;
    startTime:Date;
    endTime:Date;
    selectedInterval:[Date,Date];
}

interface State {
    selectedInterval: [Date, Date];
    error: boolean;
}


export class TimeRangePicker extends React.Component<Props, State>{
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            selectedInterval:this.props.selectedInterval,
            error: false,
        }
    }


    errorHandler = ({ error }) => {
        this.setState({ error })
    };

    onChangeCallback = (selectedInterval) => {
        this.setState({ selectedInterval });
        this.props.updateTimeRange(selectedInterval);
    }
    
    formaTick = (ms: any) =>{
        return format(new Date(ms), 'yy-MM-dd');
    }

    render() {
        let disabledIntervals = [
            { start: this.props.startTime, end: this.props.selectedInterval[0] },
            { start: this.props.selectedInterval[1], end: this.props.endTime },
        ]
        return (<>
            <div>
                <TimeRange
                    //containerClassName="toto2"
                    step={step}
                    // ticksNumber={36}
                    selectedInterval={this.props.selectedInterval}
                    timelineInterval={[this.props.startTime, this.props.endTime]}
                    onUpdateCallback={this.errorHandler}
                    onChangeCallback={this.onChangeCallback}
                    formatTick={(ms)=>{return this.formaTick(ms)}}
                    disabledIntervals={disabledIntervals}
                />
            </div>
            <div className="selected-interval">
                <span>Selected Interval: </span>
                <span key={0}>{format(this.state.selectedInterval[0], "dd MMM yyyy")}</span>
                {" - "}
                <span key={1}>{format(this.state.selectedInterval[1], "dd MMM yyyy")}</span> 
            </div>
        </>
        )
    }
}