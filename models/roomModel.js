const mongoose=require("mongoose")

const roomSchema=new mongoose.Schema({
    room_id:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    images:{
        type:Object,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    checked:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})


module.exports=mongoose.model("Rooms",roomSchema);