import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {ConvertImgRoutes} from "./routes/ConvertImage.routes.js";
import { ResizeImgRoutes } from "./routes/ResizeImage.routes.js";
import { PdfImgRoutes } from "./routes/PdfImage.routes.js";
import { WaterMarkRoutes } from "./routes/WaterMark.routes.js";
import { CompressImgRoutes } from "./routes/Compress.routes.js";
dotenv.config({ path: './backend/.env', quiet:true }); // explicit path
const app=express()  // create express instance
app.use(cors({
    origin:"http://localhost:5173",
    methods:["POST","GET"],
    credentials:true
}))
app.use(express.urlencoded({ extended: true })); // parse url encoded bodies
app.use(express.json()) //parse json automatically
app.use("/api/v1/Convert",ConvertImgRoutes) // route that handles convert image request
app.use("/api/v1/Resize",ResizeImgRoutes) // route that handles resize image request
app.use("/api/v1/Pdf",PdfImgRoutes) //route that handles create pdf request
app.use("/api/v1/WaterMark",WaterMarkRoutes)
app.use("/api/v1/compress",CompressImgRoutes)









app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`);
    
})