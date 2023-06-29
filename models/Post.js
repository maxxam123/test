const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    {
    userId:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        max: 500
    },
    state:{
        type: String,
        default:""
    },
    ip:{
        type:String,
        default:""
    },
    name:{
        type: String,
    },    
    owner:{
        type: String,
    }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);