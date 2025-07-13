const Room = require('../models/room');
const Owner = require('../models/owner');
const mongoose = require("mongoose");

const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: "Invalid room ID format" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const owner = await Owner.findById(room.owner);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const roomDetails = {
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
      ownerName: owner.name,
      username: owner.username,
      mobileNumber: owner.mobileNumber,
      email: owner.email,
      ownerType: owner.ownerType,
    };

    return res.status(200).json({ "room details": roomDetails });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getRoomById
};
