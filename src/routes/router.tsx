import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Statistics } from "../pages/statistics/Statistics";

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
                            <Home dataset={this.props.dataset} totalInfo={this.props.totalInfo}/>
                        }
                    />
                    <Route
                        path={"/map"}
                        element={
                            <Home dataset={this.props.dataset} totalInfo={this.props.totalInfo}/>
                        }
                    />
                    <Route path={"/stat"} element={<Statistics dataset={this.props.dataset} />} />
                </Routes>
            </>
        )
    }
}