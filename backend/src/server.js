const app = require('./app');
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes")
const productRoute =require('./routes/productRoutes')
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require('./db/database');




const PORT = process.env.PORT || 5000;

connectDB();
const server = app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });


