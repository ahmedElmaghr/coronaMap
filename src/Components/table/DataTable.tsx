import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { CountryDailyInfo } from '../../models/CountryDailyInfo';
import './DataTable.css';
import { columnsSchema } from './schema/schema';

interface Props{
  data: CountryDailyInfo[];
}
interface State{
  headerHeight : any;
}



export class DataTable extends React.Component<Props,State>{

  constructor(props){
    super(props);
    this.state={
      headerHeight : 0
    }
  }
  componentDidMount(){
      //TODO not a reactjs way to get element
      var element = document.getElementById("header");
      console.log("height",element? element.offsetHeight : 0)
      let headerHeight =  element? element.offsetHeight : 0;
    this.setState({ headerHeight: `calc(95vh - ${headerHeight}px)`})
  }
  render(){
    return (
      <div className='data-table' style={{height: this.state.headerHeight}}>
        <DataGrid
          rows={this.props.data}
          columns={columnsSchema}
          pageSize={20}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    );
  }
}
