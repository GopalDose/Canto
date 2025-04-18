import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptates aliquid explicabo, reiciendis libero dolorum commodi necessitatibus placeat. Consectetur architecto ipsam hic ad ratione veritatis quas amet, excepturi itaque quisquam?</p> */}
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-8605961162</li>
                    <li>gopaldose21@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            copyright 2024 DreamDeveloper.com - All Right Reserved
        </p>
    </div>
  )
}

export default Footer