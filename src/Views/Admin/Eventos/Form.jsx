import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';
import { TextField, Button, Input, InputLabel, Autocomplete } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { initializeApp } from "firebase/app";
import imageCompression from 'browser-image-compression';
//import { getAnalytics } from "firebase/analytics";

import firebaseConfig from '../../../firebase/Apikeys';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import LoadingScreen from '../../../Components/Dialog/LoadingScreen';
import SnackbarAlert from '../../../Components/Snackbar/Snackbar';
import ErrorBoundary from '../../Error/ErrorBoundary';
import { axiosPrivate } from '../../../api/axios';
import AuthContext from "../../../Context/AuthProvider";

function createData(id, label) {
    return { label, id };
}

const options = [
    createData(1, "Muy Pronto"),
    createData(2, "Cancelado"),
    createData(3, "Finalizado")
];

const Form = ({ event, loading }) => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const [uploading, setUploading] = useState();
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [alerta, setAlerta] = useState('');
    const [image, setImage] = useState();

    let initial;
    let validation = Yup.object({
        txtNombre: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(15, 'Must be 15 characters or less')
            .required("Campo Requerido"),
        txtDesc: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(100, 'Must be 100 characters or less')
            .required("Campo Requerido"),
        date: Yup.date()
            .required("Seleccione una Fecha"),
        url: Yup.string()
            .required('Ingrese una imagen')
    });

    if (Object.keys(event).length !== 0) {
        initial = {
            txtNombre: event.eventName,
            txtDesc: event.eventDescription,
            txtState: event.eventStatus,
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
        //console.log(image);
        return () => {
        }
    }, [])

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validation,
        onSubmit: async (values) => {
            //alert(JSON.stringify(values, null, 2) + image);
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
                setUploading(true);
                let urlPortada;
                if (Object.keys(event).length !== 0) {
                    //update
                    if (image !== undefined) {
                        urlPortada = await uploadFile(image)
                    }
                    await axiosPrivate.put('/events/edit_event', {
                        id: String(event.idEvent),
                        eventName: values.txtNombre,
                        eventDescription: values.txtDesc,
                        eventDate: values.date,
                        eventState: values.txtState,
                        imgPortada: image ? urlPortada : values.url
                    }).then((res) => {
                        if (formik.values.url !== event.imgPortada) {
                            var fileRef = ref(storage, event.imgPortada);
                            deleteObject(fileRef).then(() => {
                                console.log("File Deleted");
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                        setMensaje("Evento Guardado");
                        setAlerta("success");
                        setOpen(true);
                        setTimeout(() => {
                            navigate(-1);
                        }, 2000);
                    }).catch((error) => {
                        var fileRef = ref(storage, urlPortada);
                        deleteObject(fileRef).then(() => {
                            console.log("File Deleted");
                        }).catch((err) => {
                            console.log(err);
                        })
                        setMensaje(error.response.data.message);
                        setAlerta("error");
                        setOpen(true);
                    });
                } else {
                    //new
                    urlPortada = await uploadFile(image);
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
                        imgPortada: urlPortada
                    }).then((res) => {
                        setUploading(false);
                        setMensaje("Evento Guardado");
                        setAlerta("success");
                        setOpen(true);
                        setTimeout(() => {
                            navigate(-1);
                        }, 2000);
                    }).catch((error) => {
                        var fileRef = ref(storage, urlPortada);
                        deleteObject(fileRef).then(() => {
                            console.log("File Deleted");
                        }).catch((err) => {
                            console.log(err);
                        })
                        setUploading(false);
                        console.error(error.response.data);
                        setMensaje(error.response.data.message);
                        setAlerta('error');
                        setOpen(true);
                    });
                }
            } catch (err) {
                setUploading(false);
                console.log(err);
            }
        },
    });

    function rand() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * 8));
        }
        return result;
    }

    const uploadFile = async (file) => {
        let year = new Date().getFullYear();//curr year
        const name = `Events/e${year}-${rand()}`;//rand name
        const fileRef = ref(getStorage(), name);//storage ref
        const imageFile = file;
        //console.log('originalFile instanceof File: ', imageFile instanceof File); // true
        //console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        if (imageFile.size / 1048 < 300) {
            try {
                await uploadBytes(fileRef, imageFile).then(() => {
                    setUploading(false);
                }).catch((error) => {
                    console.log(error);
                    setAlerta("error");
                    setMensaje("Error al subir la imagen")
                    setOpen(true);
                });
            } catch (err) {
                console.log(err);
                setAlerta("error");
                setMensaje("Error al subir la imagen")
                setOpen(true);
            }

        } else {
            const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            }
            try {
                const compressedFile = await imageCompression(imageFile, options);
                console.log('compressedFile instanceof File', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

                await uploadBytes(fileRef, compressedFile).then(() => {
                    setUploading(false);
                }).catch((error) => {
                    console.log(error);
                    setAlerta("error");
                    setMensaje("Error al subir la imagen")
                    setOpen(true);
                });

            } catch (error) {
                console.log(error);
            }
        }//else not < 300kb
        return await getDownloadURL(fileRef);
    }

    return (
        <>
            {event &&
                !loading ? (
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
                            <Autocomplete className='cmb child'
                                id="cmbState-auto"
                                disablePortal
                                options={options}
                                isOptionEqualToValue={(option, value) => option.label === value}
                                value={formik.values.txtState}
                                onChange={(event, value) => {
                                    formik.setFieldValue("txtState", value.label);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        name='txtState'
                                        {...params}
                                        helperText={Boolean(formik.errors.txtState) ? formik.errors.txtState : ""}
                                        error={formik.touched.txtState && Boolean(formik.errors.txtState)}
                                        label='Estado'
                                    />)}
                            />
                            <div className='btn_mn'>
                                <NavLink to="/admin/news">
                                    <Button className='btn_form' type='button' variant='contained' color='error'>Cancelar</Button>
                                </NavLink>
                                <Button className='btn_form' type='submits' variant='contained' color='success'>Guardar</Button>
                            </div>
                        </form>
                        <SnackbarAlert open={open} handleClose={() => setOpen(false)} mensaje={mensaje} alert={alerta} />
                    </ErrorBoundary>
                    <LoadingScreen loading={uploading} />
                </div>
            ) : (
                <LoadingScreen loading={loading} />
            )
            }
        </>
    )
}

export default Form;