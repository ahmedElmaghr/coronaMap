import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { HistoricalCountry } from "../models/historical/HistoricalCountry";
import { About } from "../pages/about/About";
import { Page1 } from "../pages/page1/Page1";
import { Page2 } from "../pages/page2/Page2";
import { Page3 } from "../pages/page3/Page3";

interface Props {
    dataset: any;
    totalInfo: any;
}
interface State {

}
export class Router extends React.Component<Props, State> {

    render() {
        return (
            <>
                <Routes>
                    <Route
                        path={"/"}
                        element={
                            <Page1 dataset={this.props.dataset} totalInfo={this.props.totalInfo} />
                        }
                    />
                    <Route
                        path={"/map"}
                        element={
                            <Page1 dataset={this.props.dataset} totalInfo={this.props.totalInfo} />
                        }
                    />
                    <Route path={"/stat"} element={<Page2 dataset={this.props.dataset} />} />
                    <Route path={"/charts"} element={<Page3></Page3>} />
                    <Route path={"/about"} element={<About />} />
                </Routes>
            </>
        )
    }
}