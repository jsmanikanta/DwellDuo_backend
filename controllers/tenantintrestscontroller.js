const Intrests=require('../models/tenantintrests');
const Tenant=require('../models/tenant');
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

const addIntrests=async(req,res)=>{
    try {
        const {
            gender,
            preferredAge,
            personalityType,
            currentstatus,
            smokingorAlcohol,
            pets,
            guests,
            hobbies,
            genere,
            language,
            sport,
            roomtype,
            budgetrange,
            bio,
            profile,
            socialmedia
        } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const tenant = await Tenant.findById(req.tenantId);
        if(!Tenant){
            return res(400).json({message:"teant not found"});
        }

        const newIntrests = new Intrests({
            gender,
            preferredAge,
            personalityType,
            currentstatus,
            smokingorAlcohol,
            pets,
            guests,
            hobbies,
            genere,
            language,
            sport,
            roomtype,
            budgetrange,
            bio,
            profile,
            socialmedia,
            tenant: req.tenantId    
        });

        await newIntrests.save();
        res.status(201).json({ message: "Intrested added successfully", intrest:newIntrests });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports={
    addIntrests,upload
}