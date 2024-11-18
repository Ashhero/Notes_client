// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
