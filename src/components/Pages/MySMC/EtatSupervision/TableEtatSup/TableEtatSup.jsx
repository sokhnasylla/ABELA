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
  { id: 'action', label: 'Action', minWidth: 50,format: (value) => value.toFixed(2),},
  { id: 'HoteService', label: 'Hôte/Service', minWidth: 170 },
  {id: 'dateApp',label: 'Date Apparition',  minWidth: 100},
  {id: 'dateTrans',label: 'Date Transfert',minWidth: 100,},
  {id: 'structure',label: 'Structure',minWidth: 100},
  {id: 'systeme',label: 'Systeme',minWidth: 100},
];

function createData(action,HoteService, dateApp, dateTrans, structure,systeme) {
 
  return {action,HoteService, dateApp, dateTrans, structure,systeme};
}

const rows = [
  createData( FaBan,"2SMOBILE2.orange.sn_S2M --- SV-SE-Linux-FS_System","2024-01-01 15:01:08","2024-01-03 16:41:34","DST/DD/DPM/PMA","INCONNU"	), 
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