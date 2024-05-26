import React from 'react';
import { BrowserRouter as Routes, Router, Route } from 'react-router-dom'
import './App.css';
import { Signin, Signup } from './pages'

function App () {
  return (
  <div>
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  </div>
  )
}
  

export default App;
