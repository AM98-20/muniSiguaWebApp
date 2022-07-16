import React from 'react';
import './Users.css'
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
import { axiosPrivate } from '../../../api/axios';
import SnackbarAlert from '../../../Components/Snackbar/Snackbar';

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

const Users = ({ users }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [openS, setOpenS] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [alerta, setAlerta] = useState('info');

    let rows = [];

    for (let i = 0; i < users.length; i++) {
        rows.push(users[i]);
    }

    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleChangeState = async (idUser, state) => {
        try {
            await axiosPrivate.put(`/users/change_state`,
                {
                    id: String(idUser),
                    userState: state
                }
            ).then(() => {
                window.location.reload();
            }).catch(error => {
                setMensaje('El registro no fue encontrado');
                setAlerta('error');
                setOpenS(true);
            });

        } catch (err) {
            console.error(err);
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleReload = () => {
        window.location.reload()
    }

    const editIcon = (id) => (
        <div>
            <NavLink to={'' + id} >
                <Tooltip title='Editar'>
                    <Icon className='icons icons-a' icon="eva:edit-fill" height={"1.2rem"} />
                </Tooltip>
            </NavLink>
        </div>
    );

    const deleteIcon = (id) => (
        <div >
            <UserDialog open={open} handleClose={() => setOpen(false)} id={id} url='/users/delete_user/' onClose={handleReload} />
            <Tooltip title='Eliminar'>
                <Icon className='icons icons-d' icon="fluent:delete-12-filled" height={"1.2rem"} onClick={() => handleClickOpen()} />
            </Tooltip>
        </div>
    );

    const stateIcon = (state, idUser) => (
        <div >
            {
                state !== 0 ? (
                    <Tooltip title='Inactivar'>
                        <Icon className='icons icons-d' icon="akar-icons:lock-off" height={"1.2rem"} onClick={() => handleChangeState(idUser, 0)} />
                    </Tooltip>
                ) : (
                    <Tooltip title='Activar'>
                        <Icon className='icons icons-d' icon="akar-icons:lock-on" height={"1.2rem"} onClick={() => handleChangeState(idUser, 1)} />
                    </Tooltip>
                )
            }
        </div>
    );

    return (
        <div className='usr_main'>
            <NavLink className="link-nav" to='new'>
                <Button className='btnAdd' variant="contained" color="success">Nuevo</Button>
            </NavLink>
            <div className='usr_mid'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Usuario</StyledTableCell>
                                <StyledTableCell>Nombre Usuario</StyledTableCell>
                                <StyledTableCell>Correo</StyledTableCell>
                                <StyledTableCell>Puesto</StyledTableCell>
                                <StyledTableCell>Estado</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <StyledTableRow key={row.idUser}>
                                        <StyledTableCell component="th" scope="row" >
                                            {editIcon(row.idUser)}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {deleteIcon(row.idUser)}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.idUser}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.username}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name + ' ' + row.surname}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.email}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.post.postDesc}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {stateIcon(row.state, row.idUser)}
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
                <SnackbarAlert open={openS} handleClose={() => setOpenS(false)} mensaje={mensaje} alert={alerta} />
            </div>
        </div>
    )
}

export default Users;