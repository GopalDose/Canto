import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext'; // Import your context
import './OrderDisplay.css'
const OrderDisplay = ({ order }) => {
    const { token, food_list, url } = useContext(StoreContext); // Use the context if needed
    const formatDate = (isoDate) => {
        const createdOn = new Date(isoDate);
        const datePart = createdOn.toISOString().split('T')[0]; // YYYY-MM-DD

        // Format time as HH:mm
        const timePart = createdOn.toTimeString().split(' ')[0].slice(0, 5); // Extract HH:mm from time string

        return `${datePart} (${timePart})`;
    };

    return (
        <div className="order-item">
            <div className="order-id">
                Order Id: <span>{order.orderId}</span>
            </div>
            <div className="date">
            Ordered on: <span>{formatDate(order.createdOn)}</span>

                <div className={order.orderTaken ? "Received" : "NotReceived"}>
                    {order.orderTaken ? "Received" : "Not Received"}
                </div>
            </div>

            <div className="cart-data">
                <h4>Cart Items:</h4>
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Quantity</p>
                </div>
                {
                    food_list.map((item, index) => {
                        if (order.cartData[item._id] > 0) {
                            return (
                                <div className="" key={index}>
                                    <div className="cart-items-title cart-items-item">
                                        <img src={url + "/images/" + item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>{order.cartData[item._id]}</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="price">
                Total Bill : <span>${order.total}</span>
            </div>
        </div>
    );
};

export default OrderDisplay;
