import express from "express";
import { getProperties, getPropertyById, createProperty, getPropertiesByLandlord, deleteProperty, updateProperty } from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.get("/landlord/:landlordId", getPropertiesByLandlord);
router.post("/", createProperty);
router.put("/edit/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;
