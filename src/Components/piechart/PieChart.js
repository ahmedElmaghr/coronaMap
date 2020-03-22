import React, { PureComponent } from "react";
import './PieChart.css'
import Pie from './Pie'
export default class PieChart extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        
        // For a real world project, use something like
        let width = window.screen.width * 0.25;
        let height = window.screen.height * 0.25;
        let minViewportSize = Math.min(width, height);
        // This sets the radius of the pie chart to fit within
        // the current window size, with some additional padding
        let radius = (minViewportSize * .9) / 2;
        // Centers the pie chart
        const {x,y,opacity,zIndex} = this.props;
        return (
                <svg id="pieStat"  viewBox="0 0 210 250" className="piechart" style={{ opacity: opacity ,zIndex: zIndex}}>
                    <Pie x={x} y={y} radius={radius} data={this.props.data} />
                </svg>
        );

    }
}

