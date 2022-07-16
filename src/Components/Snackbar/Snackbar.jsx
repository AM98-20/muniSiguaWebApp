import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ open, handleClose, mensaje, alert }) => {

    const handleOnClose = () => {
        handleClose(false);
    }
    return (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleOnClose}>
            <Alert onClose={handleOnClose} severity={alert} sx={{ width: '100%' }}>
                {mensaje}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert;