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

export { addToCart, removeFromCarts, getCart };
