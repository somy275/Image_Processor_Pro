import {Router} from "express"
import { ConvertMultipleImg, ConvertSingleImg, ProgressEvents } from "../controller/ConvertImg.js"
import upload from "../middleware/Upload.js"
const router=Router() // create router instance for handling multiple http request

router.get("/Progress",ProgressEvents)
router.post("/ConvertSingleImg",upload.single("Image"), ConvertSingleImg)
router.post("/ConvertMultipleImg",upload.array("Images"), ConvertMultipleImg)

export const ConvertImgRoutes=router