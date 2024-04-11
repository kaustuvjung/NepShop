const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter the product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Please Enter the product Description"]
    },
    price:{
        type:String,
        required:[true, "Please Enter the product Price"],
        maxLength:[8, "Price cannot exceed *figure number"]
    },
    rating:{
        type:Number,
        default:0
    },

    image: {
        type: Object,
        default: {},
      },
  
    category:{
        type:String,
        required:[true, "please Enter Product category"]
    },
    stock:{
        type:Number,
        required:[true, "Please Enter product Stock"],
        maxLength:[4, "stock value cannot exceed the 4 digit number"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                 required: true,
            },
            name:{
                type:String,
                require:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Product",productSchema);