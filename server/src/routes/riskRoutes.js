import express from "express";
import { getTenantRiskScore } from "../controllers/riskController.js";

const router = express.Router();

router.get("/", getTenantRiskScore);

export default router;