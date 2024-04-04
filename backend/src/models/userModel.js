const mongoose = require("mongoose");
const { ObjectId }= mongoose.Schema;
const bcrypt = require("bcryptjs"); 
const validator = require("validator");

const userSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Please add a name"],
        maxLength:[30, "Name Cannot exceed 30 characters"],
        minLength:[4,"Name should more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        validate: [validator.isEmail, "please Ente a valid email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid email"
        ],
    },
    password: {
        type: String,
        required: [true,"please add a password"],
        minLength: [6, "password must be up to 6 characters"],
        maxLength: [23, "password must be not more than 20 characters"],
        select: false,
    },
    role:{
        type: String,
        required: [true],
        default: "customer",
        enum: ["customer", "admin","suspended"],
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
    isVerified: {
        type: Boolean,
        default: false,
    },
    userAgent: {
      type: Array,
      required: true,
      default: [],
    },
      
    address:{
        // type: Object,
        // address, state, country, postalcode
        type: {
            address: { type: String },
            state: { type: String },
            country: { type: String },
            postalcode: { type: String }
        },

    },
    
},
{
    timestamps:true,
    minimize:false
}

);

///encrypt password before sending to dtabase
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next()
    }
    // Hash password
    const salt =  await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
});

const User = mongoose.model("User", userSchema);
module.exports = User;