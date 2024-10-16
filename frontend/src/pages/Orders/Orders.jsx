import React, { useContext, useEffect, useState } from 'react';
import './Orders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import OrderDisplay from '../../components/OrderDisplay/OrderDisplay'; // Assuming this component exists for individual order display

const Orders = () => {
    const { token, url } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);

    const loadOrderData = async () => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setOrders(response.data.cartData); // Assuming response.data.cartData contains an array of orders
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (token) {
            loadOrderData();
        }
    }, [token]);

    // Debugging effect to log the orders after they are updated
    useEffect(() => {
        console.log(orders); // Log orders whenever they change
    }, [orders]);

    return (
        <div className="container">
            <div className="heading">
                Orders
            </div>
            <div className="order-display">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderDisplay key={order._id} order={order} />
                    ))
                ) : (
                    <p>No orders available</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
