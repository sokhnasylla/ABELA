import React from 'react'
import DataTable from 'react-data-table-component';
import { Checkbox } from '@mui/material';
import ArrowDownward from "@mui/material/Icon"

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

function TableBase(props) {
  return (
    <DataTable
    pagination
    selectableRowsComponent={Checkbox}
    selectableRowsComponentProps={selectProps}
    sortIcon={sortIcon}
    dense
    {...props}
/>
  )
}

export default TableBase