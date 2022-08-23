import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';
import { TextField, Button } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { initializeApp } from "firebase/app";
import imageCompression from 'browser-image-compression';
//import { getAnalytics } from "firebase/analytics";

import firebaseConfig from '../../../firebase/Apikeys';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import AuthContext from '../../../Context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import ErrorBoundary from '../../Error/ErrorBoundary';
import LoadingScreen from '../../../Components/Dialog/LoadingScreen';
import SnackbarAlert from '../../../Components/Snackbar/Snackbar';

const Form = ({ news, loading }) => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    //const analytics = getAnalytics(app);
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const [mainUrl, setMainUrl] = useState();
    const [mainImg, setMainImg] = useState();
    const [fileUrl, setFileUrl] = useState(news.imgArray ? Object.values(news.imgArray) : []);
    const [image, setImage] = useState(news.imgArray ? Object.values(news.imgArray) : []);
    const [id, setId] = useState(null);

    const [uploading, setUploading] = useState();
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [alerta, setAlerta] = useState('info');
    const [deleteUrls, setDeleteUrls] = useState([]);

    let initial;
    if (Object.keys(news).length !== 0) {
        initial = {
            txtTitular: news.newsName,
            txtDesc: news.newsDesc,
            txtNoticia: news.newsBody,
            imgPortada: news.imgPortada ? news.imgPortada : ''
        }
    } else {
        initial = {
            txtTitular: '',
            txtDesc: '',
            txtNoticia: '',
            imgPortada: ''
        }
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
        imgPortada: Yup.string()
            .required("Debe ingresar una imagen")
    });

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validation,
        onSubmit: async (values) => {
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
                let urlImgs = [];
                if (Object.keys(image).length !== 0) {
                    for (let i = 0; i < image.length; i++) {
                        if (image[i] instanceof File) {
                            urlImgs.push(await uploadFile(image[i]));
                        } else {
                            urlImgs.push(image[i])
                        }
                    }
                } else {
                    urlImgs = [];
                }
                if (Object.keys(news).length !== 0) {
                    //update
                    let urlPortada;
                    if (mainUrl !== undefined) {
                        urlPortada = await uploadFile(mainImg)
                    }
                    await axiosPrivate.put('/news/edit_news', {
                        id: String(news.idNews),
                        newsName: values.txtTitular,
                        newsDesc: values.txtDesc,
                        newsBody: values.txtNoticia,
                        imgPortada: mainImg ? urlPortada : values.imgPortada,
                        imgArray: urlImgs
                    }).then((res) => {
                        if (formik.values.imgPortada !== news.imgPortada) {
                            var fileRef = ref(storage, news.imgPortada);
                            deleteObject(fileRef).then(() => {
                                console.log("File Deleted");
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                        if (Object.keys(deleteUrls !== 0)) {
                            for (let i = 0; i < deleteUrls.length; i++) {
                                var fileRef1 = ref(storage, deleteUrls[i]);
                                deleteObject(fileRef1).then(() => {
                                    console.log("File Deleted");
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }
                        }
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
                        setMensaje(error.response.data.message);
                        setAlerta("error");
                        setOpen(true);
                    });
                } else {
                    //new
                    let urlPortada = await uploadFile(mainImg);
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);
                    today.toDateString();
                    await axiosPrivate.post('/news/add_news', {
                        //data
                        newsName: values.txtTitular,
                        newsDesc: values.txtDesc,
                        newsBody: values.txtNoticia,
                        newsDate: timeElapsed,
                        idEditor: auth.user.idUser,
                        imgPortada: urlPortada,
                        imgArray: urlImgs
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

    useEffect(() => {
        if (id !== null) {
            async function handleRemove() {
                console.log(deleteUrls)
                fileUrl.splice(id, 1);
                image.splice(id, 1);
                const array1 = fileUrl;
                const array2 = image;
                setFileUrl(array1);
                setImage(array2);
            }
            handleRemove();
        } else {
            setId(null);
        }
        return () => {
            setId(null);
        }
    }, [id, fileUrl, image, initial, mainUrl, formik, storage, deleteUrls])

    const handleMain = async (e) => {
        if (e.target.files) {
            const imgArray = e.target.files[0];
            const fileArray = URL.createObjectURL(e.target.files[0]);
            setMainImg(imgArray);
            setMainUrl(fileArray);
            console.log(`originalFile size ${imgArray.size / 1048} KB`)
            formik.setFieldValue('imgPortada', fileArray)
        }
    }

    const handleChange = (e) => {
        if (e.target.files) {
            const imgArray = Array.from(e.target.files).map((file) => file);
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setImage((prevImg) => prevImg.concat(imgArray));
            setFileUrl((prevUrls) => prevUrls.concat(fileArray));
        }
    }

    const renderImages = (source) => {
        return source.map((url, i) => {
            return <div className='main_display'>
                <Button key={i} className='btn_dlt' variant='contained' color='secondary' onClick={(e) => { e.stopPropagation(); e.preventDefault(); setId(i); setDeleteUrls((prev) => prev.concat(fileUrl[i])); }} ><Icon icon='line-md:cancel-twotone' height='0.8rem' /></Button>
                <img style={{ height: '5rem' }} src={url} key={url} alt={url} />
            </div>
        })
    }

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
        const name = `News/n${year}-${rand()}`;//rand name
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
            {news &&
                loading ? (
                <LoadingScreen loading={true} />
            ) : (
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
                                            <img style={{ height: '5rem' }} src={formik.values.imgPortada} alt={formik.values.imgPortada} />
                                        </div>
                                    }
                                </div>
                                <input name='main' style={{ display: 'none' }} accept="image/jpg" onChange={handleMain} id="contained-button" type="file" />
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                            <label className='upload' htmlFor="contained-button-file">
                                <h3>Imagenes Alternas</h3>
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
                        <SnackbarAlert open={open} handleClose={() => setOpen(false)} mensaje={mensaje} alert={alerta} />
                    </ErrorBoundary>
                    <LoadingScreen loading={uploading} />
                </div>
            )
            }
        </>
    )
}

export default Form;