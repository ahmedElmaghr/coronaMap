import { JsonConvert } from "json2typescript";
import * as React from "react";
import { CountryDailyInfo } from "../../models/CountryDailyInfo";
import { DataTable } from "../../components/table/DataTable";

interface Props {
    dataset : any;
}
export class Page2 extends React.Component<Props, Readonly<{}>>{

    constructor(props) {
        super(props);
    }
    
    render() {
          let jsonConvert: JsonConvert = new JsonConvert();
          let coutriesDailyinfo : CountryDailyInfo[] = jsonConvert.deserializeArray(this.props.dataset, CountryDailyInfo);
        return (
            <div>
                <DataTable data={coutriesDailyinfo}></DataTable>
            </div>
        )
    }
}