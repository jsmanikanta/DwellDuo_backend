const Owner = require("../models/owner");
const Room = require("../models/room");
const mongoose = require("mongoose");

const getOwnerbyId = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    console.log(ownerId);
    
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: "Invalid tenant ID format" });
    }
    const owner = await Owner.findById(ownerId);
    const room = await Room.find({ owner: ownerId });

    if (!owner) {
      return res.status(400).json({ message: "owner not found" });
    }
    if (!room) {
      return res.status(400).json({ message: "room not found" });
    }

    const roomDetails = room.map((room) => ({
      roomTitle: room.title,
      rent: room.rent,
      roomtype: room.roomtype,
      description: room.description,
      location: room.location,
      availability: room.availability,
      availableFrom: room.availableFrom,
      amenities: room.amenities,
      genderPreference: room.genderPreference,
      images: room.images,
      createdAt: room.createdAt,
    }));

    const fullProfile = {
      ownerName: owner.name,
      username: owner.username,
      mobileNumber: owner.mobileNumber,
      email: owner.email,
      ownerType: owner.ownerType,
      rooms: roomDetails,
    };

    return res.status(200).json(fullProfile);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports={
    getOwnerbyId
}