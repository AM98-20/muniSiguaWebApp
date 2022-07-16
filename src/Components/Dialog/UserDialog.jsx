import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { axiosPrivate } from '../../api/axios';
import SnackbarAlert from '../Snackbar/Snackbar';

const UserDialog = ({ open, handleClose, id, url, onClose }) => {
    const [openS, setOpenS] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [alerta, setAlerta] = useState('info');

    const handleOnClose = () => {
        handleClose(false);
    }

    const submit = async () => {
        try {
            await axiosPrivate.delete(`${url}${id}`, {
                params: {
                    id: id
                }
            }).then(() => {
                setMensaje('Registro eliminado');
                setAlerta('success');
                setOpenS(true);
                setTimeout(() => {
                    handleOnClose();
                }, 1800);
            }).catch(error => {
                setMensaje('El registro no fue encontrado');
                setAlerta('error');
                setOpenS(true);
                setTimeout(() => {
                    handleOnClose();
                }, 1800);
            });

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Dialog
                onClose={(reason) => onClose(reason)}
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Eliminar el Registro?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Seguro desea eliminar el registro seleccionado? Esto significa
                        que el registro perderá la información y privilegios.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnClose} >Cancelar</Button>
                    <Button onClick={() => { submit(); onClose('closeButtonClick'); }} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
                <SnackbarAlert open={openS} handleClose={() => setOpenS(false)} mensaje={mensaje} alert={alerta} />
            </Dialog>
        </div>
    );
}

export default UserDialog;