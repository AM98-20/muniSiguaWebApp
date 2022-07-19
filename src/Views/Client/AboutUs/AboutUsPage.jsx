import React from 'react'
import AboutUs from './AboutUs'
import Header from '../../../Components/Header/Header'
import Page from '../../../Components/Page/Page'

const AboutUsPage = () => {
  return (
    <Page
      header={<Header />}
    >
      <AboutUs />
    </Page>
  )
}

export default AboutUsPage;