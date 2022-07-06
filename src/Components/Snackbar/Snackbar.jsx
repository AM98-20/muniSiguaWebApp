import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({open, handleClose, mensaje, alert}) => {

    const handleOnClose = () => {
        handleClose(false);
    }
    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleOnClose}>
            <Alert onClose={handleOnClose} severity={alert} sx={{ width: '100%' }}>
                {mensaje}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert;