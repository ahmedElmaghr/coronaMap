import * as React from "react"

export class Footer extends React.Component {

    render() {

        return (
            <>
                    <i className="fa fa-github-square" aria-hidden="true"></i>
                    <a
                        href="https://github.com/ahmedElmaghr/coronaMap.git"
                        className="github-link"
                        style={{ color: "white" }}
                    >
                        {" "}
                        github repository
                    </a>
            </>
        )
    }
}