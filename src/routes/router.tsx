import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Page1 } from "../pages/page1/Page1";
import { Page2 } from "../pages/page2/Page2";

interface Props{
    dataset:any;
    totalInfo:any;
}
interface State{

}
export class Router extends React.Component<Props,State> {

    render() {
        return (
            <>
                <Routes>
                    <Route
                        path={"/"}
                        element={
                            <Page1 dataset={this.props.dataset} totalInfo={this.props.totalInfo}/>
                        }
                    />
                    <Route
                        path={"/map"}
                        element={
                            <Page1 dataset={this.props.dataset} totalInfo={this.props.totalInfo}/>
                        }
                    />
                    <Route path={"/stat"} element={<Page2 dataset={this.props.dataset} />} />
                </Routes>
            </>
        )
    }
}