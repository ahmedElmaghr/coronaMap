import * as React from "react"
import { NextPrevious } from "../../components/nextPrevious/nextPrevious"

export class Header extends React.Component {

    render() {

        return (
            <>
                <div className="header">
                    <NextPrevious clickPrevious={()=>{console.log("click previous")}} clickNext={()=>{console.log("click next")}} />
                    <div>covid19 worldwide <i className="fa fa-globe" aria-hidden="true"></i></div>
                </div>
            </>
        )
    }
}