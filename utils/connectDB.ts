import mongoose from "mongoose";

async function connectDB() {
    if(mongoose.connections[0].readyState){ return; }
    mongoose.set("strictQuery" , false)
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("mongoUri is undefined");
    }
    await mongoose.connect(mongoUri)
    console.log("connect to DB");
}

export default connectDB;