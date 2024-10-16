import React, { useContext, useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import logo from '../../assets/Canto.png'

const Header = ({setShowLogin}) => {
    const navigate = useNavigate();
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext)
    const logout = () =>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }
  return (
    <div className='navbar'>
        <img src={logo} alt="" onClick={()=>{navigate("/")}} className="logo" />
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount() === 0 ? "":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>sign in</button> 
            :
            <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className='nav-profile-dropdown'>
                    <li onClick={() => navigate("/orders")}>
                        <img src={assets.bag_icon} alt="" /><p>Orders</p>
                    </li>
                    <hr />
                    <li onClick={logout}>
                        <img src={assets.logout_icon} alt="" /><p>Logout</p>
                    </li>
                    </ul>    
            </div>}
            
        </div>
    </div>
  )
}

export default Header