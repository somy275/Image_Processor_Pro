import archiver from "archiver";
import sharp from "sharp"


//----------------------SSE:- send real time progress or updates to client------------------------//
export const ProgressEvents=(_,res)=>{
res.setHeader("Content-Type","text/event-stream");
res.setHeader("Cache-Control","no-cache");
res.setHeader("Connection","keep-alive");
res.flushHeaders() // force server to immediately send headers to browser to establish a live connection without waiting for the response body to finish.
//store SSE connection globally
global.progress=res;
// send initial event
res.write(`data:${JSON.stringify({progress:0,status:"Uploading"})}`);
}



//--------------helper:send real time updates to client----------------------
 const sendProgress=(progress,status)=>{
            global.progress?.write(`data:${JSON.stringify({progress,status})}\n\n`)
        }
export const CompressSingleImg=async(req,res)=>{
    try{
const file=req?.file;
const {Quality}=req.body;
   //--------------Processing:40%----------------------------
sendProgress(40,"Processing");
const baseImg=sharp(file.buffer);
const meta=await baseImg.metadata()
  //-------------------Resizing:80%----------------------  
sendProgress(80,"Compressing")
//-------------------Compress Image based on format-----------------//
const Processed=CompressByFormat(baseImg,meta.format,Number(Quality));
const output=await Processed.toBuffer()
//------------------Completed:100%-----------------
sendProgress(100,"Completed")
  res.setHeader("Content-Type", `image/${meta.format}`);
    res.send(output);
    }
    catch(err){
        res.status(500).json({ message: "Compression failed" });
    }
}


export const CompressMultipleImg=async(req,res)=>{
    try{
const files=req?.files;
const {Quality}=req.body;
  //--------------Processing:40%----------------------------
sendProgress(40,"Processing");
const archiever=archiver("zip",{zlib:{level:9}});
archiever.pipe(res);
let count=0;
let total=files.length;
for(let file of files){
    const baseImg=sharp(file.buffer);
    const meta=await baseImg.metadata();
    //-------------------Compress Image based on format-----------------//
const Processed=CompressByFormat(baseImg,meta.format,Number(Quality));
const output=await Processed.toBuffer()
archiever.append(output,{name:file.originalname})
 //-------------------Resizing:80%----------------------
 count++;
 const percent=Math.floor(40+(count/total)*40);
 sendProgress(percent,"Compressing");
}
 //----------------Completed:100%------------------------------
    sendProgress(100,"Completed");
archiever.finalize()
    }
    catch(err){
        res.status(500).json({ message: "Compression failed" });
    }
}


//-------------------Compress Image based on format-----------------//
const CompressByFormat=(baseImg,format,quality)=>{
switch(format){
    case "jpeg":
        case "jpg":
            return baseImg.jpeg({
                quality:quality,
                progressive:true,
                mozjpeg: true,
            });
    case "png":
        return baseImg.png({
            quality:quality,
            compressionLevel: 9,
            palette: true,
        });
    case "webp":
        return baseImg.webp({
        quality: quality,
        });

    case "avif":
        return baseImg.avif({
        quality: quality,
        });

}
}