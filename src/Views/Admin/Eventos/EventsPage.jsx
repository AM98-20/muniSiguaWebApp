import React, { useState, useEffect } from 'react'
import Events from './Events'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'
import axios from '../../../api/axios'

const EventsPage = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState({});

  useEffect(() => {
    setLoading(true);
    async function loadData() {
      const res = await axios.get('/events/all_events');
      setEvents(res.data.events);
      setLoading(false);
      console.log(res.data.events);
    }
    loadData();

    return () => {
      setEvents({});
      setLoading(true);
    }
  }, [])
  return (
    <>
      {
        loading ? (<AdminPage></AdminPage>) : (
          <AdminPage
            header={<HeaderNav Title="Eventos" />}
          >
            <Events events={events} />
          </AdminPage>
        )
      }
    </>

  )
}

export default EventsPage;