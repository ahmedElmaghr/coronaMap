
import * as React from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { SelectOptions } from "../../dto/selectOptions";


interface Props {
    options: SelectOptions[];
    onChange: any;
}
const animatedComponents = makeAnimated();

export class SelectRange extends React.Component<Props, Readonly<{}>>{

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            //defaultValue={[colourOptions[4], colourOptions[5]]}
            // isMulti
            options={this.props.options}
            onChange={(e) => this.props.onChange(e)} />
        )
    }
}