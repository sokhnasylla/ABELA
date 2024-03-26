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
  { id: 'HoteService', label: 'Hôte/Service', minWidth: 100 },
  {id: 'details',label: 'Details',  minWidth: 100},
  {id: 'duree',label: 'Durée',minWidth: 100,},
  {id: 'dateVerif',label: 'Date Verification',minWidth: 100},
];

function createData(HoteService, details, duree, dateVerif) {
 
  return {HoteService, details, duree, dateVerif};
}

const rows = [
  createData("ZIGUINCHOR_AGENCE_W_SW02 ---Ping_LAN","CRITICAL - 10.91.2.253 rta 451.615ms > 400.000ms","2024-01-16 13:37:52","2023-07-18 16:35:30"), 
  createData("ZIGUINCHOR_AGENCE_REGIONAL_RT01---Ping_LAN","CRITICAL - 10.91.2.1: Time to live exceeded in transit @ 192.168.114.105. rta nan, lost 100%","2023-12-27 21:21:23","2023-08-29 11:54:03"),
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
    <Paper sx={{ width: '81%', overflow: 'hidden' }}>
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