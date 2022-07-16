import React, { useState, useEffect } from 'react'
import News from './News'
import HeaderNav from '../../../Components/Dashboard/HeaderNav'
import AdminPage from '../../../Components/Page/AdminPage'
import axios from '../../../api/axios'

const NewsPage = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState({});

  useEffect(() => {
    setLoading(true);
    async function loadData() {
      const res = await axios.get('/news/all_news');
      setNews(res.data.news);
      setLoading(false);
      //console.log(res.data.news);
    }
    loadData();

    return () => {
      setNews({});
      setLoading(true);
    }
  }, [])
  return (
    <>
      {
        loading ? (<AdminPage></AdminPage>) : (
          <AdminPage
            header={<HeaderNav Title="Noticias" />}
          >
            <News news={news}/>
          </AdminPage>
        )
      }
    </>
  )
}

export default NewsPage;