import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Orders from './pages/Orders/Orders'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {
      showLogin ? <LoginPopup setShowLogin={setShowLogin}/>: <></>
    }
      <div className='app'>
      <Header setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
      <Footer/>

    </>
  )
}

export default App