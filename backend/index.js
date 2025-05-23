import express from 'express'
import connectDb from './utils/connectDB.js'
import userRoute from './router/user.route.js'
import taskRoute from './router/task.route.js'

const app = express()
app.use(express.json())

app.use("/api",userRoute)
app.use("/task",taskRoute)
app.listen(5000,()=>{
  connectDb()
  console.log("Server is running port number 5000")
})

