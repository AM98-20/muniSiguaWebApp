import React, { useState, useEffect } from 'react'
import Home from './Home'
import Header from '../../../Components/Header/Header'
import Page from '../../../Components/Page/Page'
import axios from '../../../api/axios'
import LoadingScreen from '../../../Components/Dialog/LoadingScreen'

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState({});
  const [events, setEvents] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get('/news/all_news');
        setNews(res.data.news);
        const rese = await axios.get('/events/all_events');
        setEvents(rese.data.events);
      } catch {
        setNews({});
        setEvents({});
      } finally {
        setLoading(false);
      }
    }
    loadData();

    return () => {
      setNews({});
      setEvents({});
      setLoading(true);
    }
  }, [])
  return (
    <Page
      header={<Header />}
    >
      {loading ? <LoadingScreen loading={loading} /> : <Home news={news} events={events}/>}
    </Page>
  )
}

export default HomePage;