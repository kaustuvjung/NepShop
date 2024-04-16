require('dotenv').config();
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes")
const productRoute =require('./routes/productRoutes')
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require('./db/database');
const path = require("path");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(
    cors({
        origin: ["http://localhost:5173", 
        "http://NepShop.vercel.app"], 
        credentials : true,
    })
);

// Route Imports
app.use("/api/v1/user", userRoute);
app.use('/api/v1/product', productRoute);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);


app.get("/",(req, res)=>{
    res.send("Home Page");
})

app.use("/uploads", express.static(path.join(__dirname, "uploads")))




// Error Middleware 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB();
const server = app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });


