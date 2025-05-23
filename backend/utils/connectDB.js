import mongoose from "mongoose";

const connectDb = () => mongoose.connect("mongodb://127.0.0.1:27017/TodoData").then(()=>{
  console.log("MongoDb is connected successfully")
}).catch((err)=>{
  console.log(err)
});

export default connectDb;