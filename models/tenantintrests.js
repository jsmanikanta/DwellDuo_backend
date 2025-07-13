const mongoose = require('mongoose');

const intrestsSchema = new mongoose.Schema({
    gender:{
        type:[{
            type:String,
            enum:['male','female','nopreference']
        }],
        required:true
    },
    prefferedAge:{
        type:Number
    },
    personalityType:{
        type:[{
            type:String,
            enum:['introvert','extrovert','ambivert']
        }],
    },
    currentstatus:{
        type:[{
            type:String,
            enum:["Working Professional (Full-time)","Working Professional (Remote)","Student (College/University)","Freelancer","Job Seeker","Entrepreneur","Intern","Other"]
        }],
        required:true
    },
    smokingorAlcohol:{
        type:[{
            type:String,
            enum:['okay with smokers','okay with drinkers','not okay with smokers','not okay with drinkers','okay with both','not okay with both']
        }]
    },
    pets:{
        type:[{
            type:String,
            enum:['allowed','not allowed']
        }]
    },
    guests:{
        type:[{
            type:String,
            enum:['allowed','not allowed']
        }]
    },
    hobbies:{
        type:[String],
        required:true
    },
    genere:{
        type:[{
            type:String,
            enum:['horror','thriller','romantic','comedy','family','anime']
        }]
    },
    language:{
        type: [String],
        enum: ['telugu', 'hindi', 'english', 'tamil', 'kannada', 'no preference'],
        default: ['no preference']
    },
    sport: {
        type: [String],
        enum: ['cricket', 'football', 'kabbadi', 'batmantion', 'no preference'],
        default: ['no preference']
    },
    roomtype:{
        type:[{
            type:String,
            enum:['private rooom','sharedroom'],
        }],
        required:true
    },
    budgetrange:{
        type:Number,
        required:true
    },
    bio:{
        type:String
    },
    profile:{
        type:String
    },
    socialmedia:{
        type:String,
    },
    tenant:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Owner', 
        required: true
    }
});

module.exports=mongoose.model('Intrests',intrestsSchema);