import React from 'react'
import News from './News'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'

const NewsPage = () => {
  return (
    <AdminPage
      header={<HeaderNav Title="Noticias" />}
    >
      <News />
    </AdminPage>
  )
}

export default NewsPage;