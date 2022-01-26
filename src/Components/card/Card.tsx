
import React, { Component } from "react";
import uihelper from "../../utils/UIHelper";
import "./Cards.css";

interface Props {
    title: string;
    titleStyle: string;
    contentStyle: string;
    icon: string;
    value: number;
    updated : string
}
export default class Card extends Component<Props, Readonly<{}>> {
    render() {
        return (
            <div className="card">
                <div className={"red-content"}>{uihelper.buildCountUpByStringValue(this.props.value)}</div>
                <div className={"black-title"}> {/*<i className={this.props.icon} aria-hidden="true"></i>*/} {this.props.title}</div>
                <div className="card-updated">Last update: {this.props.updated}</div>
            </div>
        );
    }

}
