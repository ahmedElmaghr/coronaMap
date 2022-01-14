import * as React from "react";
import MUITable from "../../components/table/MUITable";

interface Props {
    dataset : any;
}
interface State {

}
export class Statistics extends React.Component<Props, State>{

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <MUITable></MUITable>
            </div>
        )
    }
}