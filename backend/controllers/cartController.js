import cartModel from "../models/cartModel.js";

// Helper function to generate a 4-digit random number
const generateOrderId = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
};

// Add items to user cart
const addToCart = async (req, res) => {
  const { userId, cartData, total } = req.body;
  try {
    const newCart = new cartModel({
      user: userId,
      orderId: generateOrderId(), // Use the helper function to generate the orderId
      cartData: cartData,
      total: total,
    });

    await newCart.save();
    res.json({ success: true, message: "Order Placed"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove items from user carts
const removeFromCarts = async (req, res) => {
  // Functionality for removing items from cart
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
      let cartData = await cartModel.find({user: req.body.userId})
      res.json({ success: true, cartData })
  }
  catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
  }
}

// Get all orders for admin panel
const getAllOrders = async (req, res) => {
  try {
    // Get all carts/orders, sorted by most recent first
    const orders = await cartModel.find().sort({ createdOn: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { orderTaken } = req.body;
  
  try {
    const updatedOrder = await cartModel.findByIdAndUpdate(
      id,
      { orderTaken },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Error updating order status" });
  }
};

export { addToCart, removeFromCarts, getCart, getAllOrders, updateOrderStatus };
