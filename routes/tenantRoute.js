const tenanatRoute = require("../controllers/tenantcontroller");
const getTenantRoute=require("../controllers/gettenant")
const {addIntrests,upload,} = require("../controllers/tenantintrestscontroller");
const { verifyTokenTenant } = require("../middleware/verification");

const express = require("express");

const router = express.Router();
router.post("/register", tenanatRoute.tenantRegestration);
router.get("/login", tenanatRoute.tenantLogin);

// intrests
router.post("/addintrests",verifyTokenTenant,upload.single("image"),addIntrests);

// get tenant details
router.get("/:tenantId",getTenantRoute.getTenantById)
module.exports = router;
