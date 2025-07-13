const express = require("express");
const router = express.Router();

// Controllers
const ownerController = require("../controllers/ownercontroller");
const { addroom, upload } = require("../controllers/roomcontroller");
const { verifyToken } = require("../middleware/verification");
const getOwner = require("../controllers/getowner");
const getRoom=require("../controllers/getroom");

// Owner routes
router.post("/register", ownerController.ownerRegistration);
router.get("/login", ownerController.ownerLogin);

// Room routes
router.post("/addroom", verifyToken, upload.single("image"), addroom);
router.get("/room/:roomId",getRoom.getRoomById);

// get owner details
router.get("/:ownerId", getOwner.getOwnerbyId);

module.exports = router;
