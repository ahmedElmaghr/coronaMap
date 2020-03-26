import React from "react";
import "./ToggleBtn.css";


export default class ToggleBtn extends React.Component {

  render() {

    const { checked } = this.props;
    return (
      <div class="custom-control custom-switch markdeath" >
        <input
          type="checkbox"
          class="custom-control-input"
          id="customSwitch1"
          checked={checked}
          onClick={() => {
            this.props.click()
          }}
        />
        <label class="custom-control-label" style ={{color:'white',fontWeight:'bold',fontFamily:'courier'}}for="customSwitch1">Mark deaths</label>
      </div>
      // <div>
      //   <button className="button">button</button>
      // </div>
    )
  }
}
