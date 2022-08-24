import React from 'react'
import Contactos from './Contactos'
import Header from '../../../Components/Header/Header'
import Page from '../../../Components/Page/Page'

const ContactosPage = () => {
  return (
    <Page
      header={<Header />}
    >
      <Contactos />
    </Page>
  )
}

export default ContactosPage;