import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Testinomials from './components/Testinomials'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testinomials" element={<Testinomials/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App