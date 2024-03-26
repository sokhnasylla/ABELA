
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
  { id: 'action', label: 'Action', minWidth: 100,format: (value) => value.toFixed(2)},
  { id: 'HoteService', label: 'Hote/Service', minWidth: 170 },
  {id: 'datedebut',label: 'Date Début',  minWidth: 100},
  {id: 'datefin',label: 'Date Fin',minWidth: 100,},
  {id: 'demandeur',label: 'Demandeur',minWidth: 100},
  {id: 'motif',label: 'Motifs',minWidth: 100},
  {id: 'structure',label: 'Structure',minWidth: 100},
];

function createData(action,HoteService,datedebut,datefin,demandeur,motif,structure) {
 
  return {action,HoteService,datedebut,datefin,demandeur,motif,structure};
}

const rows = [
  createData("", "ARCADES-RT02 --- Ping_LAN","2023-04-11 13:14:00","2023-04-18 13:14:00","KANTE67444 KANTE67444 -","Sur demande ARS.","DSI/A2I/ARS"), 
  createData(""," MESPMASTERPRD2---SV-SE-Linux-Memoire","2023-11-09 08:56:00","2023-11-24 08:56:00","Diouf Mamadou -","Services à deplacer sur les nouveaux","DBA")
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