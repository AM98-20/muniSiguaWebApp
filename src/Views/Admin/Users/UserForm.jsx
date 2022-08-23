import React, { useEffect, useState } from 'react'
import Form from './Form'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'
import { axiosPrivate } from '../../../api/axios'
import { useParams } from 'react-router-dom'

const UserForm = () => {
    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (params.id !== 'new') {
            async function loadData() {
                const res = await axiosPrivate.get(`/users/one_user/${params.id}`);
                setUser(res.data.user);
                setLoading(false);
            }
            loadData();
        } else {
            setLoading(false);
        }
        return () => {
            setUser([]);
            setLoading(true);
        }
    }, [params.id])

    return (
        <>
            {
                !loading ? (
                <AdminPage
                    header={<HeaderNav Title="Formulario Usuario" />}
                >
                    <Form user={user} loading={loading} />
                </AdminPage>
                ) : (
                    <AdminPage
                    header={<HeaderNav Title="Formulario Usuario" />}
                >
                </AdminPage>
                )
            }
        </>
    )
}

export default UserForm;