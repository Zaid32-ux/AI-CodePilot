import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./main";
import Login from "./components/Auth/Login.jsx"
import Register from "./components/Auth/Register.jsx";
import Home from "./components/Home/Home.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthorized(!!token);
  }, []);

  return (
    <BrowserRouter>
    <Routes>
  <Route
    path="/"
    element={
      localStorage.getItem("token") ? (
        <Home />
      ) : (
        <Navigate to="/login" />
      )
    }
  />

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;