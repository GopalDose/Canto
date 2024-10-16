import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    reg: {type: String, required: true, unique: true},
    name:{type:String, required: true},
    password: {type: String, required:true}
},{minimize:false})

const userModel = mongoose.model.user || mongoose.model("user", userSchema);
export default userModel;