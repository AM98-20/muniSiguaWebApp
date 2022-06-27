import React from 'react'
import Sample from './Sample'
import Header from '../../Components/Header/Header'
import Page from '../../Components/Page/Page'

const SamplePage = () => {
  return (
    <Page
      header={<Header />}
    >
      <Sample />
    </Page>
  )
}

export default SamplePage