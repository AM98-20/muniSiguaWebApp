import React from 'react'
import Events from './Events'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'

const EventsPage = () => {
  return (
    <AdminPage
      header={<HeaderNav Title="Eventos" />}
    >
      <Events />
    </AdminPage>
  )
}

export default EventsPage;