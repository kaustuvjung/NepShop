const { DB_NAME } = require('../constants');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(`MongoDB connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // If there's an error connecting to MongoDB, throw the error to be caught in the calling function
        throw error;
    }
};


module.exports = connectDB;
