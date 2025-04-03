import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetailsPopup, setShowDetailsPopup] = useState(false)
  const [foodList, setFoodList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch food items first to have product details available
        const foodResponse = await axios.get('http://localhost:4000/api/food/list')
        if (foodResponse.data.success && Array.isArray(foodResponse.data.data)) {
          setFoodList(foodResponse.data.data)
          console.log("Food items loaded:", foodResponse.data.data)
        }
        
        // Then fetch orders
        const ordersResponse = await axios.get('http://localhost:4000/api/cart/orders')
        if (Array.isArray(ordersResponse.data)) {
          console.log("Orders data:", ordersResponse.data)
          setOrders(ordersResponse.data)
        } else if (ordersResponse.data && Array.isArray(ordersResponse.data.orders)) {
          setOrders(ordersResponse.data.orders)
        } else {
          console.error('Unexpected response format:', ordersResponse.data)
          setOrders([])
          setError('Received invalid data format from server')
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to fetch data. Please try again later.')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:4000/api/cart/orders/${orderId}`, { orderTaken: status })
      // Update local state to reflect the change
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, orderTaken: status } : order
      ))
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Failed to update order status')
    }
  }

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Invalid date'
    }
  }

  const openDetailsPopup = (order) => {
    console.log("Opening popup for order:", order)
    console.log("Order cartData:", order.cartData)
    setSelectedOrder(order)
    setShowDetailsPopup(true)
  }

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false)
    setSelectedOrder(null)
  }

  // Get food item details by ID
  const getFoodDetails = (foodId) => {
    const foundItem = foodList.find(item => item._id === foodId)
    return foundItem || null
  }

  // Render cart items with proper food details
  const renderCartItems = (cartData) => {
    if (!cartData || typeof cartData !== 'object') {
      return <tr><td colSpan="4">No items found</td></tr>
    }
    
    // Handle if cartData is an object where keys are food IDs and values are quantities
    return Object.entries(cartData).map(([foodId, quantity]) => {
      // Get food details from our food list
      const foodItem = getFoodDetails(foodId)
      
      // If quantity is an object with a quantity property, use that instead
      const itemQuantity = typeof quantity === 'object' ? quantity.quantity || 1 : quantity
      
      return (
        <tr key={foodId}>
          <td>
            {foodItem ? (
              <div className="food-item-info">
                <p className="food-name">{foodItem.name}</p>
                <p className="food-desc">{foodItem.description?.substring(0, 50)}...</p>
              </div>
            ) : (
              `Item ID: ${foodId}`
            )}
          </td>
          <td>{itemQuantity}</td>
          <td>${foodItem ? foodItem.price.toFixed(2) : '0.00'}</td>
          <td>${foodItem ? (foodItem.price * itemQuantity).toFixed(2) : '0.00'}</td>
        </tr>
      )
    })
  }

  if (loading) return <div className="loading">Loading orders...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="orders-container">
      <h1>Customer Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id || `order-${order.orderId}`}>
                <td>{order.orderId || 'N/A'}</td>
                <td>{order.user || 'Unknown'}</td>
                <td>{order.createdOn ? formatDate(order.createdOn) : 'N/A'}</td>
                <td>${(order.total || 0).toFixed(2)}</td>
                <td className={order.orderTaken ? "completed" : "pending"}>
                  {order.orderTaken ? "Completed" : "Pending"}
                </td>
                <td className="action-buttons">
                  <button 
                    className="view-btn"
                    onClick={() => openDetailsPopup(order)}
                  >
                    View
                  </button>
                  {!order.orderTaken ? (
                    <button 
                      className="complete-btn"
                      onClick={() => updateOrderStatus(order._id, true)}
                    >
                      Complete
                    </button>
                  ) : (
                    <button 
                      className="revert-btn"
                      onClick={() => updateOrderStatus(order._id, false)}
                    >
                      Revert
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Order Details Popup */}
      {showDetailsPopup && selectedOrder && (
        <div className="popup-overlay">
          <div className="order-details-popup">
            <div className="popup-header">
              <h2>Order #{selectedOrder.orderId || 'N/A'} Details</h2>
              <button className="close-btn" onClick={closeDetailsPopup}>×</button>
            </div>
            <div className="popup-body">
              <div className="order-info-section">
                <div className="info-group">
                  <h3>Order Information</h3>
                  <p><strong>Customer:</strong> {selectedOrder.user || 'Unknown'}</p>
                  <p><strong>Date:</strong> {selectedOrder.createdOn ? formatDate(selectedOrder.createdOn) : 'N/A'}</p>
                  <p><strong>Status:</strong> <span className={selectedOrder.orderTaken ? "completed" : "pending"}>
                    {selectedOrder.orderTaken ? "Completed" : "Pending"}
                  </span></p>
                </div>
              </div>
              
              <div className="order-items-section">
                <h3>Order Items</h3>
                {selectedOrder.cartData && Object.keys(selectedOrder.cartData).length > 0 ? (
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderCartItems(selectedOrder.cartData)}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="total-label">Total</td>
                        <td className="total-value">${(selectedOrder.total || 0).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                ) : (
                  <p>No items found in this order</p>
                )}
              </div>
            </div>
            <div className="popup-footer">
              {!selectedOrder.orderTaken ? (
                <button 
                  className="complete-btn"
                  onClick={() => {
                    updateOrderStatus(selectedOrder._id, true);
                    closeDetailsPopup();
                  }}
                >
                  Mark as Completed
                </button>
              ) : (
                <button 
                  className="revert-btn"
                  onClick={() => {
                    updateOrderStatus(selectedOrder._id, false);
                    closeDetailsPopup();
                  }}
                >
                  Revert to Pending
                </button>
              )}
              <button className="close-popup-btn" onClick={closeDetailsPopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders