import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup'
import Login from './components/Login'
import Homepage from './components/Homepage'
import Watchlist from './components/Watchlist'
import { WatchlistProvider } from "./context/WatchlistContext"



const App = () => {
  return (
    
    <div>
     < WatchlistProvider>
       <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
    </WatchlistProvider>
     
     
   

    </div>
  )
}


export default App
