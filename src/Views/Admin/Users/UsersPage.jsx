import React from 'react'
import Users from './Users'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'

const UsersPage = () => {
  return (
    <AdminPage
      header={<HeaderNav Title="Usuarios" />}
    >
      <Users />
    </AdminPage>
  )
}

export default UsersPage;