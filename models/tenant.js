const mongoose= require('mongoose');

const tenantSchema =new mongoose.Schema ({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type: [{
            type: String,
            enum: ['male', 'female']
        }],
        required:true
    },
    age:{
        type: Number
    }
},{ timestamps: true })

const tenant=mongoose.model('tenant',tenantSchema);
module.exports = tenant;