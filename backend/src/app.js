const express =require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const productRoute =require('./routes/productRoutes');
const errorHandler = require("./middlewares/errorMiddleware");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(
    cors({
        origin: ["http://localhost:5173", 
        "http://NepShop.v1.app"], 
        credentials : true,
    })
);

// Route Imports
app.use("/api/v1/user", userRoute);
app.use('/api/v1/product', productRoute);

app.get("/",(req, res)=>{
    res.send("Home Page");
})


// Error Middleware 
app.use(errorHandler);

module.exports = app