import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTableStyles } from './styles';

export interface Column<T> {
  label: string;
  key?: keyof T;
  accessor?: (data: T) => React.ReactNode;
  width: string;
  align?: 'center' | 'right';
}

type Action<RowData> = {
  label: string;
  onClick: (data: RowData) => void;
};

interface CustomTableProps<RowData> {
  columns: Column<RowData>[];
  data: RowData[];
  actions?: Action<RowData>[];
}

const CustomTable = <RowData,>({
  columns,
  data,
  actions,
}: CustomTableProps<RowData>) => {
  const classes = useTableStyles();
  console.log(data);
  return (
    <TableContainer component={Paper} sx={classes.root}>
      <Table>
        <TableHead sx={classes.tableHeader}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align || 'left'}
                sx={{ width: column.width }}
              >
                {column.label}
              </TableCell>
            ))}
            {actions && actions.length > 0 && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={'left'}
                  sx={{ width: column.width, ...classes.bodyCell }}
                >
                  {column.accessor
                    ? column.accessor(row)
                    : column.key && String(row[column.key])}
                </TableCell>
              ))}
              {actions && (
                <TableCell>
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(row)}
                    >
                      {action.label}
                    </button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
