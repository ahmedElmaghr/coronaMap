import React, { PureComponent } from "react";
import './PieChart.css'
import Pie from './Pie'
export default class PieChart extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        
        console.log("render PieChart")
        // For a real world project, use something like
        // https://github.com/digidem/react-dimensions
        let width = window.screen.width * 0.15;
        let height = window.screen.height * 0.15;
        let minViewportSize = Math.min(width, height);
        // This sets the radius of the pie chart to fit within
        // the current window size, with some additional padding
        let radius = (minViewportSize * .9) / 2;
        // Centers the pie chart
        let x = this.props.x;
        let y = this.props.y;
        return (
                <svg id="pieStat" viewBox="0 0 800 100" className="piechart" style={{ visibility: this.props.visibility }}>
                    <Pie x={x} y={y} radius={radius} data={this.props.data} />
                </svg>
        );

    }
}

