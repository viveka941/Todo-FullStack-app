import exprss from 'express'
import connectDb from './utils/connectDB.js'

const app = exprss()

app.listen(5000,()=>{
  connectDb()
  console.log("Server is running port number 5000")
})

