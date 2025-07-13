const room=require('../models/room');
const owner=require('../models/owner');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const addroom=async(req,res)=>{
    try {
        const {
          title,
          description,
          roomtype,
          location,
          availability,
          availableFrom,
          amenities,
          genderPreference
        } = req.body;
    const image = req.file ? req.file.filename : undefined;
        // checking for owner
        if(!owner){
            return res(400).json({message:"owner not found"});
        }
        const newRoom=new room({
            title,
            description,
            roomtype,
            location,
            availability,
            availableFrom,
            images: image ? [image] : [],
            amenities,
            genderPreference,
            postedBy:owner.name,
            owner: req.ownerId
        })

        await newRoom.save();
        res.status(201).json({ message: "Room added successfully", room: newRoom });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports={
  addroom,upload
}