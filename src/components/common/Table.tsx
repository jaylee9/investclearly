import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTableStyles } from './styles';
import { Box, Typography } from '@mui/material';
import CustomPagination from './Pagination';

export interface Column<T> {
  label: string;
  key?: keyof T;
  accessor?: (data: T) => React.ReactNode;
  width: string;
  align?: 'center' | 'right';
}

type Action<RowData> = {
  onClick?: (data: RowData) => void;
  icon?: string;
  styles?: React.CSSProperties;
  content?: (data: RowData) => React.ReactNode;
};

interface CustomTableProps<RowData> {
  columns: Column<RowData>[];
  data: RowData[];
  actions?: Action<RowData>[];
  page: number;
  total: number;
  lastPage: number;
  setPage: (value: number) => void;
  pageSize: number;
}

const CustomTable = <RowData,>({
  columns,
  data,
  actions,
  page,
  total,
  lastPage,
  setPage,
  pageSize,
}: CustomTableProps<RowData>) => {
  const classes = useTableStyles();
  const firstItem = (page - 1) * pageSize + 1;
  const lastItem = page * pageSize > total ? total : page * pageSize;
  const handleChangePaginate = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <TableContainer component={Paper} sx={classes.root}>
        <Table>
          <TableHead sx={classes.tableHeader}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={'left'}
                  sx={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
              {actions && actions.length > 0 && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, rowIndex) => {
              const withBorderBottom = data.length - 1 !== rowIndex;

              const rowStyles = withBorderBottom
                ? classes.rowWithBorderBottom
                : undefined;

              return (
                <TableRow key={rowIndex} sx={rowStyles}>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      align={column.align || 'left'}
                      sx={{ width: column.width, ...classes.bodyCell }}
                    >
                      {column.accessor
                        ? column.accessor(row)
                        : column.key && String(row[column.key])}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell sx={classes.actionsCell}>
                      <Box sx={classes.actionCell}>
                        {actions.map(
                          (action, actionIndex) =>
                            (action.content && action.content(row)) || (
                              <i
                                key={actionIndex}
                                onClick={() =>
                                  action.onClick && action.onClick(row)
                                }
                                className={action.icon}
                                style={{ cursor: 'pointer', ...action.styles }}
                              ></i>
                            )
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={classes.pagination}>
        <Typography variant="caption" sx={classes.paginationResults}>
          Showing {firstItem}-{lastItem} of {total} results
        </Typography>
        <CustomPagination
          page={page}
          count={lastPage}
          onChange={(event, value) => handleChangePaginate(value)}
        />
      </Box>
    </>
  );
};

export default CustomTable;
