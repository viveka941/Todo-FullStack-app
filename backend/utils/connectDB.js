import mongoose from "mongoose";

const connectDb = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDb is connected successfully");
     
    })
    .catch((err) => {
      console.log(err);
    });

export default connectDb;