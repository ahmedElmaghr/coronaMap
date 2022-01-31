import {
    BarElement,
    CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import * as React from "react";
import { Bar } from 'react-chartjs-2';


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

    render() {
        return (
            <>
                <div className='graph'>
                    <Bar
                        {...this.props}
                    />
                </div>
            </>
        )
    }
}