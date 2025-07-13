const Tenant = require("../models/tenant");
const mongoose = require("mongoose");
const TenantInterests = require("../models/tenantintrests");


const getTenantById = async (req, res) => {
  try {
    const tenantId = req.params.tenantId;
    console.log(tenantId);

    if (!mongoose.Types.ObjectId.isValid(tenantId)) {
      return res.status(400).json({ message: "Invalid tenant ID format" });
    }
    console.log("Fetching tenant:", tenantId);

    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const tenantInterests = await TenantInterests.findOne({ tenant: tenantId });
    if (!tenantInterests) {
      return res.status(404).json({ message: "Tenant interests not found" });
    }

    const fullProfile = {
      tenantName: tenant.name,
      email: tenant.email,
      mobileNumber: tenant.mobileNumber,
      age: tenant.age,
      gender: tenantInterests.gender,
      preferredAge: tenantInterests.preferredAge,
      personalityType: tenantInterests.personalityType,
      currentstatus: tenantInterests.currentstatus,
      smokingorAlcohol: tenantInterests.smokingorAlcohol,
      pets: tenantInterests.pets,
      guests: tenantInterests.guests,
      hobbies: tenantInterests.hobbies,
      genere: tenantInterests.genere,
      language: tenantInterests.language,
      sport: tenantInterests.sport,
      roomtype: tenantInterests.roomtype,
      budgetrange: tenantInterests.budgetrange,
      bio: tenantInterests.bio,
      profile: tenantInterests.profile,
      socialmedia: tenantInterests.socialmedia,
    };

    return res.status(200).json(fullProfile);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTenantById,
};