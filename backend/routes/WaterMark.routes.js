import { Router } from "express";
import { ProgressEvents, WaterMarkTypeLogo, WaterMarkTypeText } from "../controller/WaterMark.js";
import upload from "../middleware/Upload.js";

const router=Router();
router.get("/Progress",ProgressEvents)
router.post("/WaterMarkTypeText",upload.single("image"),WaterMarkTypeText);
router.post("/WaterMarkTypeLogo",upload.fields([{name:"image"},{name:"logo"}]),WaterMarkTypeLogo)

export const WaterMarkRoutes=router