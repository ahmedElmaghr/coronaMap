import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { CountryDailyInfo } from '../../models/CountryDailyInfo';
import './DataTable.css';
import { columnsSchema } from './schema/schema';

interface Props{
  data: CountryDailyInfo[];
}
interface State{
  
}

const getTableHeight = () =>{
  //TODO not a reactjs way to get element
  var element = document.getElementById("header");
  console.log("height",element? element.offsetHeight : 0)
  return element? element.offsetHeight : 0;
}
const style = { height: `calc(95vh - ${getTableHeight()}px)`}
export class DataTable extends React.Component<Props,State>{

  render(){
    return (
      <div className='data-table' style={style}>
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
