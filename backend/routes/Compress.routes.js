import {Router} from "express"
import { CompressMultipleImg, CompressSingleImg, ProgressEvents } from "../controller/Compress.js";
import upload from "../middleware/Upload.js";
const router=Router();
router.get("/Progress",ProgressEvents)
router.post("/CompressSingleImg",upload.single("image"),CompressSingleImg);
router.post("/CompressMultipleImg",upload.array("images"),CompressMultipleImg);
export const CompressImgRoutes=router;