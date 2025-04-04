import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("Api Working") 
})

// db connection
connectDB();

// api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/cart",cartRouter)
app.use("/api/user", userRouter)
app.get("/",(req,res) =>  {
    res.send("API Working")
}) 

app.listen(port, ()=>{
    console.log(`Server Started in http://localhost:${port}`)
})  