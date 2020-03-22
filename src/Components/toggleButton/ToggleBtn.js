import React from "react";
import "./ToggleBtn.css";


export default class ToggleBtn extends React.Component {

  render() {

    var style = {
      zIndex: 1,
      position : "absolute",
      top: 0,
      right : '2%'
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
        <label class="custom-control-label" style ={{color:'red',fontWeight:'bold'}}for="customSwitch1">mark deaths</label>
      </div>
      // <div>
      //   <button className="button">button</button>
      // </div>
    )
  }
}
