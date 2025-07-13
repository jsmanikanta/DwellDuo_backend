const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title:{
    type: String,
    required:true
  },
  rent:{
    type:String,
    required :true
  },
  roomtype:{
    type:[{
        type:String,
        enum:['2-sharing','3-sharing','4-sharing','5-sharing','6-sharing']
    }],
    required:true
  },
  description:{
    type:String
  },
  location:{
    type:String,
    required:true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner', 
    required: true
  },
  availability:{
    type:Boolean,
    required:true
  },
  availableFrom:{
    type:Date,
    required:true
  },
  amenities:{
    type:[String]
  },
  genderPreference: {
    type: String,
    enum: ['male', 'female', 'any'],
    default: 'any'
  },
  images:{
    type:[String],
    required:true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
    }
});

module.exports = mongoose.model('Room', roomSchema);
