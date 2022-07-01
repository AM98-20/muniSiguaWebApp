import React from 'react'
import Home from './Home'
import Header from '../../../Components/Header/Header'
import Page from '../../../Components/Page/Page'

const HomePage = () => {
  return (
    <Page
      header={<Header />}
    >
      <Home />
    </Page>
  )
}

export default HomePage;