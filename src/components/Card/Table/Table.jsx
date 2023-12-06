import React from 'react'
import DataTable from 'react-data-table-component'
import { data,columns } from '../../../data/tacheself'
import TableBase from './TableBase'

function Table() {
    
  return (
    <TableBase
        columns={columns}
        data={data}
    />
  )
}

export default Table