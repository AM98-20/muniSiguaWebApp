import React, { useState } from 'react'
import Form from './Form'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { axiosPrivate } from '../../../api/axios'

const EventForm = () => {
    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (params.id !== 'new') {
            async function loadData() {
                const res = await axiosPrivate.get(`/events/one_event/${params.id}`);
                setEvent(res.data.events);
                setLoading(false);
            }
            loadData();
        } else {
            setLoading(false);
        }
        return () => {
            setEvent([]);
            setLoading(true);
        }
    }, [params.id])
    return (
        <>
            {
                loading ? (<AdminPage />) : (
                    <AdminPage
                        header={<HeaderNav Title="Formulario Evento" />}
                    >
                        <Form event={event} />
                    </AdminPage>
                )
            }
        </>
    )
}

export default EventForm;