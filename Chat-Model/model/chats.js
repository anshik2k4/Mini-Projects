const mongoose=require("mongoose");

// creating schiema

const chatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true,
        maxlength:[50,"Too long"]
    },
    to:{
         type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    isEdited:{
        type:Boolean,
        default:false
    }

});

// creating model

const Chat= mongoose.model("Chat",chatSchema);

  module.exports=Chat;