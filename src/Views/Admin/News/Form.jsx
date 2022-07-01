import React from 'react';
import { TextField, Autocomplete, Button, Switch, Typography, Stack } from '@mui/material';
import { Icon } from '@iconify/react';

import { useFormik } from 'formik';
import * as Yup from 'yup'
import { NavLink } from 'react-router-dom';

function createData(id, label) {
    return { label, id };
}

const options = [
    createData(1, "Administrador"),
    createData(2, "Editor"),
];

const Form = ({ paramid }) => {
    let id = paramid;
    if (id) {

    }

    const validation = Yup.object({
        txtUser: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(15, 'Must be 15 characters or less')
            .required("Name Requiered")
    });

    const initial = {
        txtUser: '',
        
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validation,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            {id &&
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
                                multiline="true"
                                rows={3}
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
                                multiline="true"
                                rows={8}
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
                        
                        <Autocomplete className='cmb child'
                            id="cmbPuesto-auto"
                            disablePortal
                            options={options}
                            onBlur={() => formik.setTouched(true)}
                            onChange={(event, value) => formik.setFieldValue("txtPuesto", value.id)}
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
                            <Switch defaultChecked />
                            <Typography>Activo</Typography>
                        </Stack>
                        <div className='btn_mn'>
                            <NavLink to="/admin/users">
                                <Button className='btn_form' type='button' variant='contained' color='error'>Cancelar</Button>
                            </NavLink>
                            <Button className='btn_form' type='submits' variant='contained' color='success'>Guardar</Button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Form;