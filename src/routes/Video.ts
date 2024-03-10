import express from "express";
import VideoController from "@controllers/VideoController";

const router = express.Router();

router.get("/", VideoController.getAllVideos);
router.post("/", VideoController.shareVideo);

export default router;