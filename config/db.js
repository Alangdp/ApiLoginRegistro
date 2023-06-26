import mongoose from "mongoose";

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    });

    console.log(`MongoDB connect: ${conn}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

export default connectDB;
