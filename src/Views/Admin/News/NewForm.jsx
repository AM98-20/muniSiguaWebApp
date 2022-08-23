import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Form from './Form'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'

import { axiosPrivate } from '../../../api/axios';

const NewForm = () => {

    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (params.id !== 'new') {
            async function loadData() {
                const res = await axiosPrivate.get(`/news/one_news/${params.id}`);
                setNews(res.data.news);
                setLoading(false);
            }
            loadData();
        } else {
            setLoading(false);
        }
        return () => {
            setNews([]);
            setLoading(true);
        }
    }, [params.id])

    return (
        <>
            {
                loading ? (
                    <AdminPage
                        header={<HeaderNav Title="Formulario Noticias" />}
                    >
                    </AdminPage>
                ) : (
                    <AdminPage
                        header={<HeaderNav Title="Formulario Noticias" />}
                    >
                        <Form news={news} loading={loading} />
                    </AdminPage>
                )
            }
        </>
    )
}

export default NewForm;