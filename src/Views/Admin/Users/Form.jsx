import React, { useState, useContext } from 'react';
import './Form.css';
import { TextField, Autocomplete, Button, Switch, Typography, Stack } from '@mui/material';
import { Icon } from '@iconify/react';

import { useFormik } from 'formik';
import * as Yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { axiosPrivate } from '../../../api/axios';
import SnackbarAlert from '../../../Components/Snackbar/Snackbar';
import LoadingScreen from '../../../Components/Dialog/LoadingScreen';
import AuthContext from '../../../Context/AuthProvider';

function createData(id, label) {
    return { label, id };
}

const options = [
    createData(1, 'Administrador'),
    createData(2, 'Editor'),
    createData(3, 'Escritor'),
    createData(4, 'Informática'),
];

const Form = ({ user, loading }) => {
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [alerta, setAlerta] = useState('');

    let initial;
    let validation;
    if (Object.keys(user).length !== 0) {
        let boolState;
        if (user.state === 0) {
            boolState = false;
        } else {
            boolState = true;
        }
        initial = {
            txtUser: user.username,
            txtNombre: user.name,
            txtApellido: user.surname,
            txtEmail: user.email,
            txtPassword: '',
            txtConfirmPassword: '',
            txtPuesto: user.post.postDesc,
            idPuesto: user.post.idPost,
            state: boolState
        }
        validation = Yup.object({
            txtUser: Yup.string()
                .min(3, "Minimum 3 characters")
                .max(15, 'Must be 15 characters or less')
                .required("Name Requiered"),
            txtNombre: Yup.string()
                .min(3, "Minimum 3 characters")
                .max(15, 'Must be 15 characters or less')
                .required("Name Requiered"),
            txtApellido: Yup.string()
                .min(3, "Minimum 3 characters")
                .max(15, 'Must be 15 characters or less')
                .required("Apellido Requiered"),
            txtEmail: Yup.string()
                .email("Invalid Email")
                .required("Email Requiered"),
            txtPuesto: Yup.string()
                .required("Seleccione un Puesto")
        });
    }
    else {
        initial = {
            txtUser: '',
            txtNombre: '',
            txtApellido: '',
            txtEmail: '',
            txtPassword: '',
            txtConfirmPassword: '',
            txtPuesto: '',
            idPuesto: '',
            state: false
        }
        validation = Yup.object({
            txtUser: Yup.string()
                .min(3, "Minimum 3 characters")
                .max(15, 'Must be 15 characters or less')
                .required("Name Requiered"),
            txtNombre: Yup.string()
                .min(3, "Minimum 3 characters")
                .max(15, 'Must be 15 characters or less')
                .required("Name Requiered"),
            txtApellido: Yup.string()
                .min(3, "Minimum 3 characters")
                .max(15, 'Must be 15 characters or less')
                .required("Apellido Requiered"),
            txtEmail: Yup.string()
                .email("Invalid Email")
                .required("Email Requiered"),
            txtPuesto: Yup.string()
                .required("Seleccione un Puesto"),
            txtPassword: Yup.string()
                .min(8, "Password must be 8 character minimum")
                .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
                    "Must Contain 8 characters, 1 uppercase, 1 lowercase, 1 number")
                .required("Password Requiered"),
            txtConfirmPassword: Yup.string()
                .oneOf([Yup.ref('txtPassword'), null], "Passwords must match")
        });
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validation,
        onSubmit: async (values) => {
            //alert(JSON.stringify(values, null, 2));
            try {
                if (auth.accessToken) {
                    let token = auth.accessToken;
                    const { exp } = jwtDecode(token)
                    // Refresh the token a minute early to avoid latency issues
                    const expirationTime = (exp * 1000) - 60000
                    if (Date.now() >= expirationTime) {
                        setAuth({});
                        localStorage.clear();
                        alert('La sesion ya caduco. Se cerrara la sesión actual.')
                        navigate('/');
                        // set LocalStorage here based on response;
                    }
                }
                let boolState;
                if (values.state) {
                    boolState = 1;
                } else {
                    boolState = 0;
                }
                if (Object.keys(user).length !== 0) {
                    //update
                    await axiosPrivate.put('/users/edit_user', {
                        id: String(user.idUser),
                        username: values.txtUser,
                        name: values.txtNombre,
                        surname: values.txtApellido,
                        email: values.txtEmail,
                        idPost: String(values.idPuesto),
                        userState: boolState
                    }).then((res) => {
                        setMensaje("Usuario Guardado");
                        setAlerta("success");
                        setOpen(true);
                        setTimeout(() => {
                            navigate(-1);
                        }, 2000);
                    }).catch((error) => {
                        setMensaje(error.response.data.message);
                        setAlerta("error");
                        setOpen(true);
                    });
                } else {
                    //new
                    await axiosPrivate.post('/auth/user-signup', {
                        username: values.txtUser,
                        name: values.txtNombre,
                        surname: values.txtApellido,
                        email: values.txtEmail,
                        password: values.txtPassword,
                        confirmPassword: values.txtConfirmPassword,
                        idPost: String(values.idPuesto),
                        userState: boolState
                    }).then((res) => {
                        setMensaje("Usuario Guardado");
                        setAlerta("success");
                        setOpen(true);
                        setTimeout(() => {
                            navigate(-1);
                        }, 2000);
                    }).catch((error) => {
                        console.error(error.response.data);
                        setMensaje(error.response.data.result);
                        setAlerta(error.response.data.status);
                        setOpen(true);
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <>
            {user &&
                !loading ? (
                <div className='main_section'>
                    <form className='form' onSubmit={formik.handleSubmit}>
                        <div className="input-field_signup child">
                            <Icon className='i' icon="ant-design:user-outlined" height='2rem' />
                            <TextField className='txtField'
                                label="Usuario"
                                name='txtUser'
                                value={formik.values.txtUser}
                                type="text"
                                placeholder="Usuario"
                                helperText={Boolean(formik.errors.txtUser) ? formik.errors.txtUser : ""}
                                onChange={formik.handleChange}
                                color={formik.errors.txtUser ? 'error' : 'success'}
                                error={formik.touched.txtUser && Boolean(formik.errors.txtUser)}
                                variant="standard"
                            />
                        </div>
                        <div className="input-field_signup child">
                            <Icon className='i' icon="icon-park-outline:edit-name" height='2rem' />
                            <TextField className='txtField'
                                label="Nombre(s)"
                                name='txtNombre'
                                value={formik.values.txtNombre}
                                type="text"
                                placeholder="Nombre(s)"
                                helperText={Boolean(formik.errors.txtNombre) ? formik.errors.txtNombre : ""}
                                onChange={formik.handleChange}
                                color={formik.errors.txtNombre ? 'error' : 'success'}
                                error={formik.touched.txtNombre && Boolean(formik.errors.txtNombre)}
                                variant="standard"
                            />
                        </div>
                        <div className="input-field_signup child">
                            <Icon className='i' icon="" height='2rem' />
                            <TextField className='txtField'
                                label="Apellido(s)"
                                name='txtApellido'
                                value={formik.values.txtApellido}
                                type="text"
                                placeholder="Apellido(s)"
                                helperText={Boolean(formik.errors.txtApellido) ? formik.errors.txtApellido : ""}
                                onChange={formik.handleChange}
                                color={formik.errors.txtApellido ? 'error' : 'success'}
                                error={formik.touched.txtApellido && Boolean(formik.errors.txtApellido)}
                                variant="standard"
                            />
                        </div>
                        <div className="input-field_signup child">
                            <Icon className='i' icon="ic:round-email" height='2rem' />
                            <TextField className='txtField'
                                label="Correo Electrónico"
                                name='txtEmail'
                                value={formik.values.txtEmail}
                                type="text"
                                placeholder="muni@ams.gob"
                                helperText={Boolean(formik.errors.txtEmail) ? formik.errors.txtEmail : ""}
                                onChange={formik.handleChange}
                                color={formik.errors.txtEmail ? 'error' : 'success'}
                                error={formik.touched.txtEmail && Boolean(formik.errors.txtEmail)}
                                variant="standard"
                            />
                        </div>
                        <div style={{ display: (Object.keys(user).length !== 0) ? 'none' : '' }} className="input-field_signup child">
                            <Icon className='i' icon="iconoir:password-cursor" height='2rem' />
                            <TextField className='txtField'
                                label="Contraseña"
                                name='txtPassword'
                                value={formik.values.txtPassword}
                                type="password"
                                placeholder="Contraseña"
                                helperText={Boolean(formik.errors.txtPassword) ? formik.errors.txtPassword : ""}
                                onChange={formik.handleChange}
                                color={formik.errors.txtPassword ? 'error' : 'success'}
                                error={formik.touched.txtPassword && Boolean(formik.errors.txtPassword)}
                                variant="standard"
                            />
                        </div>
                        <div style={{ display: (Object.keys(user).length !== 0) ? 'none' : '' }} className="input-field_signup child">
                            <Icon className='i' icon="ant-design:user-outlined" height='2rem' />
                            <TextField className='txtField'
                                label="Confirmar Contraseña"
                                name='txtConfirmPassword'
                                value={formik.values.txtConfirmPassword}
                                type="password"
                                placeholder="Confirmar Contraseña"
                                helperText={Boolean(formik.errors.txtConfirmPassword) ? formik.errors.txtConfirmPassword : ""}
                                onChange={formik.handleChange}
                                color={formik.errors.txtConfirmPassword ? 'error' : 'success'}
                                error={formik.touched.txtConfirmPassword && Boolean(formik.errors.txtConfirmPassword)}
                                variant="standard"
                            />
                        </div>
                        <Autocomplete className='cmb child'
                            id="cmbPuesto-auto"
                            disablePortal
                            options={options}
                            isOptionEqualToValue={(option, value) => option.label === value}
                            value={formik.values.txtPuesto}
                            onChange={(event, value) => {
                                formik.setFieldValue("txtPuesto", value.label);
                                formik.setFieldValue("idPuesto", value.id);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    name='txtPuesto'
                                    {...params}
                                    helperText={Boolean(formik.errors.txtPuesto) ? formik.errors.txtPuesto : ""}
                                    error={formik.touched.txtPuesto && Boolean(formik.errors.txtPuesto)}
                                    label='Puesto'
                                />)}
                        />
                        <Stack className='stck child' direction="row" spacing={1} alignItems="center">
                            <Typography>Inactivo</Typography>
                            <Switch
                                checked={formik.values.state}
                                onChange={formik.handleChange}
                                name='state'
                            />
                            <Typography>Activo</Typography>
                        </Stack>
                        <div className='btn_mn'>
                            <NavLink to="/admin/users">
                                <Button className='btn_form' type='button' variant='contained' color='error'>Cancelar</Button>
                            </NavLink>
                            <Button className='btn_form' type='submits' variant='contained' color='success'>Guardar</Button>
                        </div>
                    </form>
                    <SnackbarAlert open={open} handleClose={() => setOpen(false)} mensaje={mensaje} alert={alerta} />
                </div>
                ) : (
                    <LoadingScreen loading={loading} />
                )
            }
        </>
    )
}

export default Form;