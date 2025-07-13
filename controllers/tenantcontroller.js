const tenant = require("../models/tenant");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const tenantRegestration = async (req, res) => {
  const { name, email, password, gender, age, mobileNumber } = req.body;
  try {
    console.log("tenant portal opened");
    const tenantEmail = await tenant.findOne({ email });
    const tenantMobile = await tenant.findOne({ mobileNumber });
    if (tenantEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }
    if (tenantMobile) {
      return res
        .status(400)
        .json({ error: "mobile number already registered" });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new tenant
    const newTenant = new tenant({
      email,
      mobileNumber,
      password: hashedPassword,
      name,
      gender,
      age,
    });

    await newTenant.save();
    res
      .status(201)
      .json({ message: "tenant registered successfully!", tenanat: newTenant });
    console.log("Owner registered", newTenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// token generation
dotenv.config();
// Correct secret key usage
const secretKey = process.env.JWT_SECRET;

const tenantLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide an email and password." });
    }

    const tenantEmail = await tenant.findOne({ email });
    if (!tenantEmail) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. Please try again." });
    }

    // comparing the password
    const isMatch = await bcrypt.compare(password, tenantEmail.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. Please try again." });
    }

    const payload = {
      id: tenantEmail._id,
      username: tenantEmail.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      message: "Login successful!",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ error: "Server error during login. Please try again." });
  }
};

module.exports = {
  tenantRegestration,
  tenantLogin,
};
