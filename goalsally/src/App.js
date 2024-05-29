import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { Signin, Signup, Intropage } from './pages'

function App () {
  return (
  <div>
    <Router>
      <Routes>
        <Route exact path="/" element={<Intropage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  </div>
  )
}
  

export default App;
