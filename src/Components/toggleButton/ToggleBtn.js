import React from "react";
import "./ToggleBtn.css";


export default class ToggleBtn extends React.Component {

  constructor(){
    super();
  }

  render() {
    const { checked,context,type } = this.props;
    return (
      <div
        className="custom-control custom-switch markdeath"
        style={this.styling(this.props.up)}
      >
        <input
          type="checkbox"
          className="custom-control-input"
          id={this.props.id}
          checked={checked}
          onClick={() => {
              this.props.click();
          }}
        />
        <label
          className="custom-control-label"
          style={{ color: "white", fontWeight: "bold", fontFamily: "courier" }}
          for={this.props.id}
        >
          {this.props.name}
        </label>
      </div>
    );
  }

  styling = (bool)=>{
    var styleZoneCase;
    if(bool){
      styleZoneCase ={marginTop:'40px',backgroundColor:"brown",border : "solid brown"};
    }
    return styleZoneCase;
  }
}
