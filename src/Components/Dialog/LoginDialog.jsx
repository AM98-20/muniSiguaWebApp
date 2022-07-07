import * as React from 'react';
import './login.css';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { InputAdornment, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import SnackbarAlert from '../Snackbar/Snackbar';

import publicAxios from '../../api/axios';
import AuthContext from '../../Context/AuthProvider';
const LOGIN_URL = "/api/v1/auth/login";

const LoginDialog = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const validation = Yup.object({
        txtUser: Yup.string()
            .required("Debe ingresar su usario"),
        txtPassword: Yup.string()
            .required("Debe ingresar su contraseña")
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    let initial = {
        txtUser: '',
        txtPassword: ''
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                const response = await publicAxios.post(LOGIN_URL, {
                    username: values.txtUser,
                    password: values.txtPassword,
                });

                setAuth({ ...response.data });
                localStorage.setItem("user", JSON.stringify({ ...response.data }));
                formik.values.txtUser = '';
                formik.values.txtPassword = '';
                formik.touched.txtUser = false;
                formik.touched.txtPassword = false;
                navigate('/admin');
            } catch (err) {
                console.error(err);
                handleAlertOpen();
            }
        },
    });

    const handleOnClose = () => {
        formik.values.txtUser = '';
        formik.values.txtPassword = '';
        formik.touched.txtUser = false;
        formik.touched.txtPassword = false;
        handleClose(false);
    }

    const handleAlertOpen = () => {
        setOpenAlert(true);
    }

    return (
        <div>
            <Dialog
                className='dialog'
                open={open}
                onClose={handleOnClose}
                maxWidth='lg'
            >
                <DialogContent className='login_left'>
                    <img className='login_img' src='/login_img.svg' alt='secure login - undraw' />
                </DialogContent>
                <DialogContent className='login_right'>
                    <div className='form_box'>
                        <TextField
                            margin="dense"
                            id="name"
                            name='txtUser'
                            label="Usuario"
                            type="text"
                            fullWidth
                            variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon icon="carbon:user-avatar-filled-alt" color='#454545' width="25" />
                                    </InputAdornment>
                                ),
                            }}
                            value={formik.values.txtUser}
                            placeholder="Usuario"
                            onBlur={formik.handleBlur}
                            helperText={(formik.touched.txtUser && Boolean(formik.errors.txtUser)) ? formik.errors.txtUser : ""}
                            onChange={formik.handleChange}
                            color={formik.errors.txtUser ? 'error' : 'success'}
                            error={formik.touched.txtUser && Boolean(formik.errors.txtUser)}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            name='txtPassword'
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon icon="gg:password" color='#454545' width="25" />
                                    </InputAdornment>
                                ), endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            icon={showPassword ? 'codicon:eye-closed' : 'codicon:eye'}
                                        />
                                    </InputAdornment>
                                )
                            }}
                            value={formik.values.txtPassword}
                            placeholder="Usuario"
                            onBlur={formik.handleBlur}
                            helperText={(formik.touched.txtPassword && Boolean(formik.errors.txtPassword)) ? formik.errors.txtPassword : ""}
                            onChange={formik.handleChange}
                            color={formik.errors.txtPassword ? 'error' : 'success'}
                            error={formik.touched.txtPassword && Boolean(formik.errors.txtPassword)}
                        />
                        <DialogActions>
                            <Button variant='contained' color='error' onClick={handleOnClose}>Cancelar</Button>
                            <Button variant='contained' color='success' onClick={formik.handleSubmit}>Ingresar</Button>
                            <SnackbarAlert open={openAlert} handleClose={() => setOpenAlert(false)} mensaje="¡Credenciales incorrectas!" alert="error" />
                        </DialogActions>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default LoginDialog;