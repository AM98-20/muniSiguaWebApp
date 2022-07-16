import React from 'react';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TablePagination, Tooltip } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserDialog from '../../../Components/Dialog/UserDialog';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#454545',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const News = ({ news }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);

    let rows = [];

    for (let j = 0; j < news.length; j++) {
        rows.push(news[j]);
    }

    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const editIcon = (id) => (
        <div>
            <NavLink to={id}>
                <Tooltip title='Editar'>
                    <Icon className='icons icons-a' icon="eva:edit-fill" height={"1.2rem"} />
                </Tooltip>
            </NavLink>
        </div>
    );

    const deleteIcon = (
        <div >
            <UserDialog open={open} handleClose={() => setOpen(false)} />
            <Tooltip title='Eliminar'>
                <Icon className='icons icons-d' icon="fluent:delete-12-filled" height={"1.2rem"} onClick={() => handleClickOpen()} />
            </Tooltip>
        </div>
    );

    return (
        <div className='usr_main'>
            <NavLink className="link-nav" to='0'>
                <Button className='btnAdd' variant="contained" color="success">Nuevo</Button>
            </NavLink>
            <div className='usr_mid'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='right'></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>Nombre Usuario</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <StyledTableRow key={row.idNews}>
                                        <StyledTableCell component="th" scope="row" >
                                            {editIcon(row.idNews)}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {deleteIcon}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.newsName}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelRowsPerPage=''
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    )
}

export default News;