import express from 'express'
import connectDb from './utils/connectDB.js'
import userRoute from './router/user.router.js'

const app = express()
app.use(express.json())

app.use("/api",userRoute)
app.listen(5000,()=>{
  connectDb()
  console.log("Server is running port number 5000")
})

