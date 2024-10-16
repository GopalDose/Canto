import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token, setCartItems } = useContext(StoreContext);

  const navigate = useNavigate();

  const placeOrder = async () => {
    let newurl = `${url}/api/cart/add`;
    const data = {
      cartData: cartItems,
      total: getTotalCartAmount()
    }
    try {
      console.log(data)
      const res = await axios.post(newurl, data, {headers: {token}});
      if (res.data.success) {
        setCartItems({})
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error during API request", error);
      alert("An error occurred while processing your request.");
    }

  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="" key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}</p>
            </div>
          </div>
          <button onClick={placeOrder}>Place Order</button>
        </div>

      </div>
    </div>
  )
}

export default Cart 