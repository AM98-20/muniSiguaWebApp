import React, { useEffect, useState } from 'react'
import Users from './Users'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'
import { axiosPrivate } from '../../../api/axios'

const UsersPage = () => {
  const [loading, setLoading] = useState();
  const [users, setUsers] = useState({});

  useEffect(() => {
    async function loadData() {
      await axiosPrivate.get('/users/all_users').then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    }
    loadData();
    setLoading(false);

    return () => {
      setUsers({});
      setLoading(true);
    }
  }, [])

  return (
    <>
      {
        loading ? (<AdminPage></AdminPage>) : (
          <AdminPage
            header={< HeaderNav Title="Usuarios" />}
          >
            <Users users={users} />
          </AdminPage >
        )
      }
    </>
  )

}

export default UsersPage;