import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import HeaderNav from '../../Components/Dashboard/HeaderNav'
import AdminPage from '../../Components/Page/AdminPage'

import axios from '../../api/axios'

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState({});

  useEffect(() => {
    setLoading(true);
    async function loadData() {
      const res = await axios.get('/events/all_events_prox');
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
            header={<HeaderNav Title="Dashboard" />}
          >
            <Dashboard events={events} />
          </AdminPage>

        )
      }
    </>
  )
}

export default DashboardPage;