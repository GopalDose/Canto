import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login
const loginUser = async (req, res) => {
    const { reg, password } = req.body;

    try {
        const user = await userModel.findOne({ reg });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Create JWT token with expiration
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register
const registerUser = async (req, res) => {
    const { name, password, reg } = req.body; 
    try {
        // Check if user already exists
        const exist = await userModel.findOne({ reg });
        if (exist) {
            return res.json({ success: false, message: "User Already Exists" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a Stronger Password (min 8 characters)" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name: name,
            reg: reg,
            password: hashPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser };
