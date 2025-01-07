// const mongoose = require('mongoose');
import mongoose from 'mongoose';


const connectDB = async () => {
    try{

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);

    }catch(error){
        
        console.error(`Error in database: ${error.message}`);

    }
};

// module.exports = {connectDB};
export { connectDB };
