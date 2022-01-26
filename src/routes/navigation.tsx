import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { CountryDailyInfo } from "../models/CountryDailyInfo";
import { TotalInfo } from "../models/TotalInfo";
import { About } from "../pages/about/About";
import { Home } from "../pages/home/home";
import { Page1 } from "../pages/page1/Page1";
import { Page2 } from "../pages/page2/Page2";
import { Page3 } from "../pages/page3/Page3";
import { getCountryFromDataset } from "../utils/countries";

interface Props {
    dataset: CountryDailyInfo[];
    totalInfo: TotalInfo;
}
interface State {

}
export class Navigation extends React.Component<Props, State> {

    render() {
        return (
            <>
                <Routes>
                    <Route
                        path={"/"}
                        element={
                            <Home totalInfo={this.props.totalInfo}/>
                        }
                    />
                    <Route
                        path={"/map"}
                        element={
                            <Page1 dataset={this.props.dataset} totalInfo={this.props.totalInfo} />
                        }
                    />
                    <Route path={"/stat"} element={<Page2 dataset={this.props.dataset} />} />
                    <Route path={"/charts"} element={<Page3 countriesRef={getCountryFromDataset(this.props.dataset)} />} />
                    <Route path={"/about"} element={<About />} />
                </Routes>
            </>
        )
    }
}