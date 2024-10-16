import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://<email>:<password>@cluster0.3luaj.mongodb.net/Canto').then(() => {console.log("DB Connected")});
}
