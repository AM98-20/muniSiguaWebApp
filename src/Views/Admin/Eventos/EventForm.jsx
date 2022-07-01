import React from 'react'
import { useParams } from 'react-router-dom'
import Form from './Form'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'

const EventForm = () => {

    const params = useParams();

    return (
        <AdminPage
            header={<HeaderNav Title="Formulario Evento"/>}
        >
            <Form paramid={params.id}/>
        </AdminPage>
    )
}

export default EventForm;