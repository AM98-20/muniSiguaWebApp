import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TextField, Button, Input, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom';

import SnackbarAlert from '../../../Components/Snackbar/Snackbar';
import ErrorBoundary from '../../Error/ErrorBoundary';
import { useEffect, useContext } from 'react';
import { axiosPrivate } from '../../../api/axios';

import AuthContext from "../../../Context/AuthProvider";

const Form = ({ event }) => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [alerta, setAlerta] = useState('');
    const [image, setImage] = useState(null);

    let initial;
    let validation = Yup.object({
        txtNombre: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(15, 'Must be 15 characters or less')
            .required("Esciba el nombre del Evento"),
        txtDesc: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(100, 'Must be 100 characters or less')
            .required("Apellido Requiered"),
        date: Yup.date()
            .required("Seleccione una Fecha"),
        url: Yup.string()
            .required('Ingrese una imagen')
    });

    if (Object.keys(event).length !== 0) {
        initial = {
            txtNombre: event.eventName,
            txtDesc: event.eventDescription,
            txtState: event.eventState,
            date: event.eventDate,
            url: event.imgPortada
        }
    }
    else {
        initial = {
            txtNombre: '',
            txtDesc: '',
            txtState: 'Muy Pronto',
            date: null,
            url: null
        }
    }

    useEffect(() => {
        setImage();
        return () => {
            setImage(null);
        }
    }, [])

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validation,
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2) + image);
            try {
                if (Object.keys(event).length !== 0) {
                    //update
                    await axiosPrivate.put('/events/edit_event', {
                        id: String(event.idEvent),
                        eventName: values.txtNombre,
                        eventDescription: values.txtDesc,
                        eventState: values.txtState,
                        imgPortada: values.url
                    }).then((res) => {
                        setMensaje("Evento Guardado");
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
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);
                    today.toDateString();
                    await axiosPrivate.post('/events/add_event', {
                        //data
                        eventName: values.txtNombre,
                        eventDescription: values.txtDesc,
                        eventDate: values.date,
                        eventPusblishedDate: today,
                        eventState: values.txtState,
                        idPublisher: auth.user.idUser,
                        imgPortada: values.url
                    }).then((res) => {
                        setMensaje("Evento Guardado");
                        setAlerta("success");
                        setOpen(true);
                        setTimeout(() => {
                            navigate(-1);
                        }, 2000);
                    }).catch((error) => {
                        console.error(error.response.data);
                        setMensaje(error.response.data.message);
                        setAlerta('error');
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
            {event &&
                <div className='main_section'>
                    <ErrorBoundary >
                        <form className='form' onSubmit={formik.handleSubmit}>
                            <div className="input-field_signup child">
                                <Icon className='i' icon="eos-icons:modified-date-outlined" height='2rem' />
                                <TextField className='txtField'
                                    label="Nombre del Evento"
                                    name='txtNombre'
                                    value={formik.values.txtNombre}
                                    type="text"
                                    placeholder="Nombre del Evento"
                                    helperText={formik.touched.txtNombre && Boolean(formik.errors.txtNombre) ? formik.errors.txtNombre : ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    color={formik.errors.txtNombre ? 'error' : 'success'}
                                    error={formik.touched.txtNombre && Boolean(formik.errors.txtNombre)}
                                    variant="standard"
                                />
                            </div>
                            <div className="input-field_signup child">
                                <Icon className='i' icon="icon-park-outline:change-date-sort" height='2rem' />
                                <TextField className='txtField'
                                    label="Descripión"
                                    name='txtDesc'
                                    multiline={true}
                                    rows={3}
                                    value={formik.values.txtDesc}
                                    type="text"
                                    placeholder="Descripción"
                                    helperText={formik.touched.txtDesc && Boolean(formik.errors.txtDesc) ? formik.errors.txtDesc : ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    color={formik.errors.txtDesc ? 'error' : 'success'}
                                    error={formik.touched.txtDesc && Boolean(formik.errors.txtDesc)}
                                    variant="standard"
                                />
                            </div>
                            <div className="input-field_signup child">
                                <Icon className='i' icon="bi:calendar2-event" height='2rem' />
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        disablePast
                                        name='date'
                                        label="Fecha del Evento"
                                        placeholder='mm/dd/yyyy'
                                        openTo="day"
                                        views={['year', 'month', 'day']}
                                        value={formik.values.date}
                                        onChange={newValue => { formik.setFieldValue('date', newValue) }}
                                        renderInput={(params) => <TextField
                                            onBlur={formik.handleBlur}
                                            helperText={formik.touched.date && Boolean(formik.errors.date) ? formik.errors.date : ""}
                                            color={formik.errors.date ? 'error' : 'success'}
                                            {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <label className='upload' htmlFor="contained-button">
                                <h3>Portada del evento</h3>
                                <div className='display_img'>
                                    {
                                        <div className='main_display'>
                                            <img style={{ height: '5rem' }} name='image' src={formik.values.url ? formik.values.url : ''} alt='' />
                                        </div>
                                    }
                                </div>
                                <Input
                                    name='url'
                                    value={''}
                                    style={{ visibility: 'hidden' }}
                                    accept="image/jpg"
                                    onChange={
                                        (img) => {
                                            img?.target.files.length > 0 ? formik.setFieldValue('url', URL.createObjectURL(img.target.files[0])) : formik.setFieldValue('url', formik.values.url);
                                            img?.target.files.length > 0 ? setImage(img.target.files[0]) : setImage(image);
                                        }
                                    }
                                    onBlur={formik.handleBlur}
                                    id="contained-button"
                                    type="file"
                                />
                                <InputLabel className={formik.errors.url ? 'error' : 'none'} >Debe ingresar una portada para el evento</InputLabel>
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                            <div className='btn_mn'>
                                <NavLink to="/admin/news">
                                    <Button className='btn_form' type='button' variant='contained' color='error'>Cancelar</Button>
                                </NavLink>
                                <Button className='btn_form' type='submits' variant='contained' color='success'>Guardar</Button>
                            </div>
                        </form>
                        <SnackbarAlert open={open} handleClose={() => setOpen(false)} mensaje={mensaje} alert={alerta} />
                    </ErrorBoundary>
                </div>
            }
        </>
    )
}

export default Form;