import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Typography } from '@mui/material';

const columns = [
  { id: '', label: (
    <Typography sx={{ color: '#337AB7', display: 'flex', alignItems: 'center' }}>
     <ArrowDropDownIcon style={{ color: '#337AB7' }} />
    </Typography>
  ), minWidth: 10 },
  { id: 'Scenario', label: 'Scenario', minWidth: 180 },
  { id: 'Application', label: 'Application', minWidth: 160 },
  { id: 'Robot', label: 'Robot', minWidth: 140 },
  { id: 'Details', label: 'Details', minWidth: 10 },
];

const rows = []; // Tableau vide pour les données initiales

export default function StickyHeadTable() {
  return (
    <Paper sx={{ width: '81%', overflow: 'hidden', marginTop: '40px' }}>
      <TableContainer sx={{ maxHeight: 250 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {/* Vous pouvez afficher des cellules vides ou des valeurs par défaut ici */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
