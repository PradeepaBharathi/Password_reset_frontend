import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import './index.css';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
function App() {
 
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/dash" element={<Dashboard />}></Route>
         <Route path="/password-reset" element={<ResetPassword />}></Route>       
        <Route path="/forgot-password/:id/:token" element={<ForgotPassword />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      
    </>
  );


}

export default App;