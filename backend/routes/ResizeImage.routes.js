import { Router } from "express";
import { ResizeMultipleImg, ResizeSingleImg } from "../controller/ResizeImg.js";
import upload from "../middleware/Upload.js";
import { ProgressEvents } from "../controller/WaterMark.js";
const router=Router()
router.get("/Progress",ProgressEvents)
router.post("/ResizeSingleImg",upload.single("SingleImg") ,ResizeSingleImg)
router.post("/ResizeMultipleImg",upload.array("MultipleImg") ,ResizeMultipleImg)

export const ResizeImgRoutes=router