import * as React from "react"
import "./footer.css";
export class Footer extends React.Component {

    render() {

        return (
            <>
                <div>
                    <i className="fa fa-github-square" aria-hidden="true"></i>
                    <a
                        href="https://github.com/ahmedElmaghr/coronaMap.git"
                        className="github-link"
                        style={{ color: "white" }}
                    >
                        {" "}
                        github repository
                    </a>
                </div>
                <div className="version">
                    v_1.0.0
                </div>
            </>
        )
    }
}