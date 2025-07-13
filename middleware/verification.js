const Owner = require("../models/owner");
const Tenant = require("../models/tenant");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const ownerData = await Owner.findById(decoded.id);

    if (!ownerData) {
      return res.status(401).json({ error: "Owner not found" });
    }

    req.ownerId = ownerData._id;
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res
      .status(500)
      .json({
        error: "Server error during token verification. Please try again.",
      });
  }
};

const verifyTokenTenant = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const tenantData = await Tenant.findById(decoded.id);

    if (!tenantData) {
      return res.status(401).json({ error: "Otenant not found" });
    }

    req.tenantId = tenantData._id;
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res
      .status(500)
      .json({
        error: "Server error during token verification. Please try again.",
    });
  }
};

module.exports = {
  verifyToken,
  verifyTokenTenant
};
