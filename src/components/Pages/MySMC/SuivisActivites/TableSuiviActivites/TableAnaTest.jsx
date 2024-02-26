import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {FaBan} from 'react-icons/fa'
import { GoAlertFill } from "react-icons/go";

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  {id: 'TotalTest',label: 'Total Test',  minWidth: 100},
  {id: 'TotalEchecs',label: 'Total Echecs',minWidth: 100,},
  {id: 'EchecsAveres',label: 'Echecs Avérés',minWidth: 100},
  {id: 'user',label: 'User',minWidth: 100},
  { id: 'action', label: 'Action', minWidth: 50,format: (value) => value.toFixed(2),},
];

function createData(date,TotalTest,TotalEchecs,EchecsAveres,user,action) {
 
  return {date,TotalTest,TotalEchecs,EchecsAveres,user,action};
}

const rows = [
  createData("31-12-2023","3348","0","0","FALL028018",""), 
  createData("31-12-2022","10582","1226","0","FALL028018",""), 
  createData("31-12-2021","14214","760","35","FALL028832",""), 
];

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
    <Paper sx={{ width: '83%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight:250 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}