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
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
       }     
    ],
    category:{
        type:String,
        required:[true, "please Enter Product category"]
    },
    Stock:{
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
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Product",productSchema);