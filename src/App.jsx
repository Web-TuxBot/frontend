// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ChatBot from './pages/ChatBot.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Маршруты с обычным Layout (Header + Footer) */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/auth/login" element={
          <Layout>
            <Login />
          </Layout>
        } />
        <Route path="/auth/register" element={
          <Layout>
            <Register />
          </Layout>
        } />
        {/* Маршрут чат-бота без Layout */}
        <Route path="/auth/chatbot" element={<ChatBot />} />


        {/* Резервные маршруты для старых URL */}
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route path="/register" element={<Navigate to="/auth/register" replace />} />
        <Route path="/chatbot" element={<Navigate to="/auth/chatbot" replace />} />
      </Routes>
    </Router>
  );
}

export default App;