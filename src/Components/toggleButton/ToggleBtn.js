import React from "react";
import * as d3 from "d3"
import "./ToggleBtn.css";

export default class ToggleBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let svgMap = d3.selectAll('#content').node().getBoundingClientRect();

    var style = {
      zIndex: 1,
      position : "absolute",
      top: svgMap.height - 24,
      right : '50%'
    }
    const { checked } = this.props;
    return (
      <div class="custom-control custom-switch" style={style}>
        <input
          type="checkbox"
          class="custom-control-input"
          id="customSwitch1"
          checked={checked}
          onClick={() => {
            this.props.click()
          }}
        />
        <label class="custom-control-label" for="customSwitch1">Show region</label>
      </div>
      // <div>
      //   <button className="button">button</button>
      // </div>
    )
  }
}
