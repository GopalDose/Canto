import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {
    const {url, setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up")
    const [data, setData] = useState({
        name: "",
        password: "",
        reg: ""
    });

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]: value}))
    }

    useEffect(()=>{
        console.log(data)
    }, [data])

    const onLogin = async (event) =>{
        event.preventDefault();
        let newurl = currState === "Login" ? `${url}/api/user/login` : `${url}/api/user/register`;
        try {
            const res = await axios.post(newurl, data);
            if(res.data.success){
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                setShowLogin(false)
            } else {
                alert(res.data.message);
            }
          } catch (error) {
            console.error("Error during API request", error);
            alert("An error occurred while processing your request.");
          }
          

    }
  return (
    <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState === "Login" ? <></> :  <input type="text" name='name' value={data.name} onChange={onChangeHandler} placeholder='Your Name' required/>}
                
                <input name='reg' onChange={onChangeHandler} value={data.reg} type="text" placeholder='Your Reg Id' required/>
                <input type="password" value={data.password} name='password' onChange={onChangeHandler} placeholder='Password' required/>
            </div>
            <button type='submit'>{currState === "Sign Up" ? "Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {
                currState === "Login" ? 
                <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>:
                <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p> 
            }
        </form>
    </div>
  )
}

export default LoginPopup