import mongoose from "mongoose";

// Define the Cart Schema
const cartSchema = new mongoose.Schema({
    user: { type: String, required: true },
    orderId: { type: Number, required: true },
    cartData: { type: Object, default: {} },
    total: { type: Number, required: true },
    createdOn: { type: Date, default: Date.now },
    orderTaken: { type: Boolean, default: false } // New field added
}, { minimize: false });

// Create the Cart model
const cartModel = mongoose.model.cart || mongoose.model("cart", cartSchema);

export default cartModel;
