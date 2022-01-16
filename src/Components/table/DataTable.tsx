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
export class DataTable extends React.Component<Props,State>{

  render(){
    return (
      <div className='data-table'>
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
