const mongoose = require("mongoose");
const { ObjectId }= mongoose.Schema;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid email"
        ],
    },
    password: {
        type: String,
        required: [true,"please add a password"],
        minLength: [6, "password must be up to 6 characters"],
        // maxLength: [23, "password must be not more than 20 characters"],
    },
    role:{
        type: String,
        required: [true],
        default: "customer",
        enum: ["customer", "admin"],
    },
    photo: {
        type: String,
        required:  [true, "please add a photo"],
        default : "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone:{
        type: String,
        default: "+977",
    },
    address:{
        type: Object,
        // address, state, country

    },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
// module.exports = mongoose.model('User', userSchema);