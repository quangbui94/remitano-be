import express from "express";
import VideoController from "@controllers/VideoController";

const router = express.Router();

router.get("/", VideoController.getAllVdieos);

export default router;