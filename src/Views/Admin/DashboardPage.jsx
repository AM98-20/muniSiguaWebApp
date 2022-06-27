import React from 'react'
import Dashboard from './Dashboard'
import HeaderNav from '../../Components/Dashboard/HeaderNav'
import AdminPage from '../../Components/Page/AdminPage'

const DashboardPage = () => {
  return (
    <AdminPage
      header={<HeaderNav />}
    >
      <Dashboard />
    </AdminPage>
  )
}

export default DashboardPage