import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import NativeSelect from '@mui/material/NativeSelect';




export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Table class="table table-bordered table-striped" id="mytable">
				<thead>
					<tr>
						<th style={{width:'150px'}}>Date Création
          
            </th>
						<th  style={{width:'150px'}}>N°AVis</th>
						<th  style={{width:'250px'}}>Titre </th>
						<th  style={{width:'150px'}}>Etat</th>
						<th  style={{width:'150px'}}>Action</th>
					</tr>
				</thead>
				<tbody>
                   
                  <tr>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                  </tr>


				</tbody>
			
    </Table>
  )
}