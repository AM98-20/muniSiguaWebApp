import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SamplePage from "./Views/Samples/SamplePage";
import HomePage from "./Views/Client/Home/HomePage";
import DashboardPage from "./Views/Admin/DashboardPage";
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
  }, [])

  return (
    <Routes>
      <Route path="/sample" element={<SamplePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App;