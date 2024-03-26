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

const columns = [
  { id: 'hote', label: 'Hôte', minWidth: 100 },
  {id: 'service',label: 'Service',  minWidth: 100},
  {id: 'structure',label: 'Stucture',minWidth: 50,},
  {id: 'systeme',label: 'Systéme',minWidth: 100},
  {id: 'contact',label: 'Contacts',minWidth: 170},
];

function createData(hote, service, structure, systeme,contact) {
 
  return {hote, service, structure, systeme,contact};
}

const rows = [
  createData("ZIGUINCHOR_AGENCE_W_SW02","Ping_LAN","DSI/A2I/ARS","INCONNU","GroupeSupervision_DSISMC@orange-sonatel.com --- Admin_ARS@orange-sonatel.com ---"), 
  createData("Ziguinchor_Accueil","	Ping_LAN","DSI/A2I/ARS","Refonte_Lan_Republic","GroupeSupervision_DSISMC@orange-sonatel.com---Admin_ARS@orange-sonatel.com---"),
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