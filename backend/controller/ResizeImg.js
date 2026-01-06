import archiver from "archiver";
import sharp from "sharp";

//----------------------SSE:- send real time progress or information to client------------------------//
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

//Resize single image
export const ResizeSingleImg = async (req, res) => {
    try {
    
        const { ResizeScale, ResizeHeight, ResizeWidth, AspectRatio } = req.body;
        let output;
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        //--------------Processing:40%----------------------------
        sendProgress(40,"Processing")
        //User choose to resize by scale
        if (!ResizeHeight && !ResizeWidth) {
     //-------------------Resizing:80%----------------------       
            sendProgress(80,"Resizing")
      //------------------helper: Resizing the image------------------
            output = await Resize_By_Scale(req.file, ResizeScale, AspectRatio);
        } else if (ResizeHeight && ResizeWidth) {
             //-------------------Resizing:80%---------------------- 
            sendProgress(80,"Resizing")
              //------------------helper: Resizing the image------------------
            output = await Resize_By_H_W(
                req.file,
                ResizeHeight,
                ResizeWidth,
                AspectRatio
            );
        } else {
            return res.status(500).json({ message: "Resize failed" });
        }
 //------------------Completed:100%-----------------       
 sendProgress(100,"Completed")
        res.set("Content-Type", req.file.mimetype);
        res.send(output);
    } catch (err) {
         return res.status(500).json({ message: "Resize failed" });
    }
};

//Resize Multiple images
export const ResizeMultipleImg=async(req,res)=>{
    try{
        const files=req.files;
          const { ResizeScale, ResizeHeight, ResizeWidth, AspectRatio } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }
    //--------------Processing:40%----------------------------
        sendProgress(40,"Processing")
 // Prepare ZIP download
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Processed.zip"`
    );
    const archive=archiver("zip",{zlib:{level:9}});
    archive.pipe(res);
    let count=0;
    let total=files.length;
    for(let file of files){
        let output;
        if(!ResizeHeight && !ResizeWidth){
             output=await Resize_By_Scale(file, ResizeScale, AspectRatio)
        }
        else if(ResizeHeight && ResizeWidth){
             output = await Resize_By_H_W(
                file,
                ResizeHeight,
                ResizeWidth,
                AspectRatio
            );
        }
//--------------------------Processing:40 to 80%------------------------
      let name=file.originalname.split(".")
      archive.append(output,{name:`${name[0]}.${name[1]}`})
      count++;
      const percent=Math.floor(40+(count/total)*40);
      sendProgress(percent,"Resizing")
    }
    //----------------Completed:100%------------------------------
    sendProgress(100,"Completed");
    archive.finalize()
    }
    catch(_){
  return res.status(500).json({ message: "Resize failed" });
    }
}



//Resize by scale
export const Resize_By_Scale = async (file, scale, aspect) => { 
    const metadata = await sharp(file.buffer).metadata(); // Get original image size
    const factor = Number(scale) / 100;
    //Calculate new Size
    const newWidth = Math.round(metadata.width * factor); //new width for resizing
    const newHeight = Math.round(metadata.height * factor); //new height for resizing
    //Resize image
    const Resize = sharp(file.buffer);
    let output; // contain the resize image after resizing
    // Resize image by maintaining aspect ratio
    if (aspect) {
        output = await Resize.resize({
            width: newWidth,
        }).toBuffer();
    }
    // Resize image using height and weight
    else {
        output = await Resize.resize({
            width: newWidth,
            height: newHeight,
            fit: "cover",
        });
    }
    return output;
};

//Resize image using Height and width
export const Resize_By_H_W = async (file, height, width, aspect) => {
    aspect = JSON.parse(aspect);
    height = Number(height);
    width = Number(width);
    let output;
    let Resize = sharp(file.buffer);
    if (aspect) {
        console.log("ok");
        // resize image by maintaining aspect ratio
        output = await Resize.resize({
            width,
        }).toBuffer();
    } else {
        
        // resize image according to height and width
        output = await Resize.resize({
            width,
            height,
            fit: "cover",
        }).toBuffer()
    }
    return output;
};


