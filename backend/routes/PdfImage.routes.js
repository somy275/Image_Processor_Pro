import { Router } from "express";
import { Img_Pdf_Conversion, ProgressEvents } from "../controller/ImgPdfConversion.js";
import upload from "../middleware/Upload.js";
const router=Router();
router.get("/Progress",ProgressEvents)
router.post("/CreatePdf",upload.array("Pdf"), Img_Pdf_Conversion);
export const PdfImgRoutes=router