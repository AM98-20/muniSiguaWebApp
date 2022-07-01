import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SamplePage from "./Views/Samples/SamplePage";
//client side
import HomePage from "./Views/Client/Home/HomePage";
//admin side
import DashboardPage from "./Views/Admin/DashboardPage";
import UsersPage from "./Views/Admin/Users/UsersPage"
import UserForm from "./Views/Admin/Users/UserForm";
import EventsPage from "./Views/Admin/Eventos/EventsPage";
import EventForm from "./Views/Admin/Eventos/EventForm";
import NewsPage from "./Views/Admin/News/NewsPage";
import NewForm from "./Views/Admin/News/NewForm";
//info & errors
import ErrorPage from "./Views/Error/ErrorPage";

import { useContext, useEffect } from "react";
import AuthContext from "./Context/AuthProvider";

function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('user'));
    console.log(auth);
    if (auth !== null) {
      setAuth(auth);
    }
  }, [setAuth])

  return (
    <Routes>
      <Route path="/sample" element={<SamplePage />} />
      {/* client side */}
      <Route path="/" element={<HomePage />} />
      {/* admin side */}
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/users/:id" element={<UserForm />} />
      <Route path="/admin/events" element={<EventsPage />} />
      <Route path="/admin/events/:id" element={<EventForm />} />
      <Route path="/admin/users/:id" element={<UserForm />} />
      <Route path="/admin/news" element={<NewsPage />} />
      <Route path="/admin/news/:id" element={<NewForm />} />
      {/* info & errros */}
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App;