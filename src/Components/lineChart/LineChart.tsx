import faker from 'faker';
import * as React from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    options: any;
    data: any;
}
export class LineChart extends React.Component<Props, Readonly<{}>>{

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Line
                {...this.props}
            />
        )
    }
}