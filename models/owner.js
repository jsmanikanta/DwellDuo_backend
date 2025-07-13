// importing database
const mongoose= require('mongoose');

const ownerSchema =new mongoose.Schema ({
    name:{
        type : String,
        required:true,
        trim:true
    },
    username:{
        type : String,
        required : true,
        unique:true,
        trim:true
    },
    password:{
        type : String,
        required : true,
        trim:true
    },
    mobileNumber:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    ownerType:{
        type:[{
            type:String,
            enum:['hostel','flat','individual-House']
        }],
        required:true
    },
},{ timestamps: true })

const Owner=mongoose.model('Owner',ownerSchema);
module.exports = Owner;