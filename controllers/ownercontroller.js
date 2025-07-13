const owner=require('../models/owner');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// Correct secret key usage
const secretKey = process.env.JWT_SECRET;

const ownerRegistration=async (req,res)=>{
   const { name, username, email, password, mobileNumber,rent} = req.body;
    try {
        console.log("owner portal opened");

        // email or mobile number exists they say them to login
        const ownerEmail=await owner.findOne({email});
        const ownerMobile=await owner.findOne({mobileNumber});
        if (ownerEmail) {
           return res.status(400).json({ error: "Email already registered" });
        }
        if (ownerMobile) {
           return res.status(400).json({ error: "Mobile Number already registered" });
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating new owner
        const newOwner= new owner({
            name,
            username,
            password:hashedPassword,
            mobileNumber,
            email,
            rent
        });

        // Save owner to database
        await newOwner.save();
        res.status(201).json({ message: "Owner registered successfully!", owner: newOwner });
        console.log("Owner registered",newOwner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const ownerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if both fields are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide an email and password." });
        }

        const ownerEmail = await owner.findOne({ email }); 
        if (!ownerEmail) {
            return res.status(401).json({ error: "Invalid credentials. Please try again." });
        }
        // comparing the password
        const isMatch = await bcrypt.compare(password, ownerEmail.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials. Please try again." });
        }
        const payload = {
            id: ownerEmail._id,
            username: ownerEmail.username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({
            message: "Login successful!",
            token: token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Server error during login. Please try again." });
    }
};

module.exports = {
    ownerRegistration,
    ownerLogin
};