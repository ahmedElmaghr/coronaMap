import React from "react";
import "./ToggleBtn.css";

export default class ToggleBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var style = {
      zIndex: 1
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
