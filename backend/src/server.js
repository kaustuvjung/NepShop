const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes")
const errorHandler = require("./middlewares/errorMiddleware")

const app = express()

// middlewares
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

// Routes
app.use("/api/v1/user", userRoute)
app.get("/", (req, res) => {
    res.send("Home Page")

})
// Error Middleware 
app.use(errorHandler);

const PORT = process.env.PORT || 5000
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () =>{
        console.log(`Server is running on prort ${PORT}`);
    })
})
.catch((err) => console.log(err))
