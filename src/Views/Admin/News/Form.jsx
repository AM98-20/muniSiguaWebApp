import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TextField, Button } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup'
import { NavLink } from 'react-router-dom';

import ErrorBoundary from '../../Error/ErrorBoundary';

const Form = ({ paramid }) => {
    const [mainUrl, setMainUrl] = useState([]);
    const [mainImg, setMainImg] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [image, setImage] = useState([]);
    let id = paramid;
    if (id) {

    }

    // useEffect(() => {
    //   setFileUrl();
    //   setImage();
    // }, [fileUrl, image])

    const handleRemove = (item) => {
        if (item !== -1) {
            fileUrl.splice(item, 1);
            image.splice(item, 1);
            const array1 = fileUrl;
            const array2 = image;
            setFileUrl(array1);
            setImage(array2);
        }
    }

    const handleMain = (e) => {
        if (e.target.files) {
            const imgArray = e.target.files[0];
            const fileArray = URL.createObjectURL(e.target.files[0]);
            setMainImg(imgArray);
            setMainUrl(fileArray);
            console.log(mainImg);
        }
    }

    const handleChange = (e) => {
        if (e.target.files) {
            const imgArray = Array.from(e.target.files).map((file) => file);
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setImage((prevImg) => prevImg.concat(imgArray));
            setFileUrl((prevUrls) => prevUrls.concat(fileArray));
            console.log(image);
            console.log(fileUrl);

        }
    }

    const renderImages = (source) => {
        return source.map((url, i) => {
            return <div className='main_display'>
                <Button key={i} className='btn_dlt' variant='contained' color='secondary' onClick={() => handleRemove(i)} ><Icon icon='line-md:cancel-twotone' height='0.8rem' /></Button>
                <img style={{ height: '5rem' }} src={url} key={url} alt={url} />
            </div>
        })
    }

    const validation = Yup.object({
        txtTitular: Yup.string()
            .min(3, "Mínimo 3 caracteres para el Titular")
            .max(30, 'Máximo 30 caracteres para este campo')
            .required("Este campo es requerido"),
        txtDesc: Yup.string()
            .max(45, 'Máximo 45 caracteres para este campo')
            .required("Este campo es requerido"),
        txtNoticia: Yup.string()
            .max(1000, 'Máximo 1000 caracteres para este campo')
            .required("Este campo es requerido"),
    });

    const initial = {
        txtTitular: '',
        txtDesc: '',
        txtNoticia: ''
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validation,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            console.log(image);
            console.log(fileUrl);
        },
    });

    return (
        <>
            {id &&
                <div className='main_section'>
                    <ErrorBoundary >
                        <form className='form' onSubmit={formik.handleSubmit}>
                            <div className="input-field_signup child">
                                <Icon className='i' icon="ant-design:user-outlined" height='2rem' />
                                <TextField className='txtField'
                                    label="Titular"
                                    name='txtTitular'
                                    value={formik.values.txtTitular}
                                    type="text"
                                    placeholder="Titular"
                                    helperText={Boolean(formik.errors.txtTitular) ? formik.errors.txtTitular : ""}
                                    onChange={formik.handleChange}
                                    color={formik.errors.txtTitular ? 'error' : 'success'}
                                    error={formik.touched.txtTitular && Boolean(formik.errors.txtTitular)}
                                    variant="standard"
                                />
                            </div>
                            <div className="input-field_signup child">
                                <Icon className='i' icon="icon-park-outline:edit-name" height='2rem' />
                                <TextField className='txtField'
                                    label="Descripión"
                                    name='txtDesc'
                                    multiline={true}
                                    rows={3}
                                    value={formik.values.txtDesc}
                                    type="text"
                                    placeholder="Descripción"
                                    helperText={Boolean(formik.errors.txtDesc) ? formik.errors.txtDesc : ""}
                                    onChange={formik.handleChange}
                                    color={formik.errors.txtDesc ? 'error' : 'success'}
                                    error={formik.touched.txtDesc && Boolean(formik.errors.txtDesc)}
                                    variant="standard"
                                />
                            </div>
                            <div className="input-field_signup child">
                                <Icon className='i' icon="" height='2rem' />
                                <TextField className='txtField'
                                    label="Cuerpo de la Noticia"
                                    name='txtNoticia'
                                    multiline={true}
                                    rows={8}
                                    value={formik.values.txtNoticia}
                                    type="text"
                                    placeholder="Noticia"
                                    helperText={Boolean(formik.errors.txtNoticia) ? formik.errors.txtNoticia : ""}
                                    onChange={formik.handleChange}
                                    color={formik.errors.txtNoticia ? 'error' : 'success'}
                                    error={formik.touched.txtNoticia && Boolean(formik.errors.txtNoticia)}
                                    variant="standard"
                                />
                            </div>
                            <label className='upload' htmlFor="contained-button">
                                <h3>Portada de la Noticia</h3>
                                <div className='display_img'>
                                    {
                                        <div className='main_display'>
                                            <img style={{ height: '5rem' }} src={mainUrl} alt={mainUrl} />
                                        </div>
                                    }
                                </div>
                                <input name='main' style={{ display: 'none' }} accept="image/jpg" onChange={handleMain} id="contained-button" type="file" />
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                            <label className='upload' htmlFor="contained-button-file">
                                <h3>Imagenes Secundarias</h3>
                                <div className='display_img'>
                                    {
                                        fileUrl ? renderImages(fileUrl) : <></>
                                    }
                                </div>
                                <input name='images' style={{ display: 'none' }} accept="image/jpg" onChange={handleChange} id="contained-button-file" type="file" multiple />
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
                    </ErrorBoundary>
                </div>
            }
        </>
    )
}

export default Form;