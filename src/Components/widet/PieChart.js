import React, { PureComponent } from "react";
import './PieChart.css'
import Pie from './Pie'
export default class PieChart extends PureComponent {

    constructor(props) {
        super(props);
    }

    //return (
    // <div className="piechart" style ={{visibility : this.props.visibility}}>
    //     Test
    // </div>

    render() {

        // For a real world project, use something like
        // https://github.com/digidem/react-dimensions
        let width = 120;
        let height = 120;
        let minViewportSize = Math.min(width, height);
        // This sets the radius of the pie chart to fit within
        // the current window size, with some additional padding
        let radius = (minViewportSize * .9) / 2;
        // Centers the pie chart
        let x = this.props.x;
        let y = this.props.y;
        return (
            <svg width="100%" height="100%" className="piechart" style ={{visibility : this.props.visibility}}> 
                    <Pie x={x} y={y} radius={radius} data={this.props.data} />
                </svg>
        );

    }
}

