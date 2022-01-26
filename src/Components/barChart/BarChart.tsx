import {
    BarElement,
    CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import * as React from "react";
import { Bar } from 'react-chartjs-2';
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";

import {
    selectedInterval,
    disabledIntervals,
    timelineInterval
} from "./datesSource";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    options: any;
    data: any;
}
export class BarChart extends React.Component<Props, Readonly<{}>>{

    constructor(props: Props) {
        super(props);
    }
    errorHandler = ({ error }) => this.setState({ error });

    onChangeCallback = (selectedInterval) => this.setState({ selectedInterval });

    render() {
        return (
            <>
                <div className='graph'>
                    <Bar
                        {...this.props}
                    />
                </div>
                {/* <div>
                    <TimeRange
                        // error={error}
                        ticksNumber={36}
                        selectedInterval={selectedInterval}
                        timelineInterval={timelineInterval}
                        onUpdateCallback={this.errorHandler}
                        onChangeCallback={this.onChangeCallback}
                        disabledIntervals={disabledIntervals}
                    />
                </div>
                <div className="info">
                    <span>Selected Interval: </span>
                    {selectedInterval.map((d, i) => (
                        <span key={i}>{format(d, "dd MMM, HH:mm")}</span>
                    ))}
                </div> */}
            </>
        )
    }
}