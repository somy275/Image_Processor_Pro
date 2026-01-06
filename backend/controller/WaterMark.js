import sharp from "sharp"

//---------------SSE:Send real time updates to client-----------------
export const ProgressEvents=(req,res)=>{
res.setHeader("Content-Type","text/event-stream");
res.setHeader("Cache-control","no-cache");
res.setHeader("Connection","keep-alive");
res.flushHeaders(); // VERY IMPORTANT
 // Store SSE connection locally
 global.progress = res;
 // Send initial event
 res.write(`data:${JSON.stringify({progress:0,status:"Uploading"})}\n\n`)
}
export const WaterMarkTypeText=async(req,res)=>{
    try{
      
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
        const sendProgress = (progress, status) => {
      global.progress?.write(
        `data: ${JSON.stringify({ progress, status })}\n\n`
      );
    };

        let{text,textSize,position,opacity}= req.body
        
        /* ---------- Font sizes ---------- */
        const fontSizeMap={ //font sizes
            "small":16,
            "medium":24,
            "large":36,
            "xlarge":48
        }
        let fontSize=fontSizeMap[textSize]??24; //get the font size
          /* ---------- AUTO margin calculation ---------- */
        const padding =15;
        const autoMargin=fontSize+padding*2
    //----------40% - processing-------------
     sendProgress(40, "Processing");
    const image=sharp(req.file.buffer);
    const metadata=await image.metadata()
      /* ---------- Extend image (REAL margin) ---------- */
      const extendedImage=image.extend({
        top:autoMargin,bottom:autoMargin,left: autoMargin,
      right: autoMargin,   background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
    //------------80% - Adding WaterMark------------
   sendProgress(80, "Adding Watermark");
     /*-------------------------- Position mapping----------------*/
     const {x,y,anchor}=WaterMarkPosition(position,metadata,fontSize,autoMargin,padding)
    //SVG Watermark
    const svg = `
      <svg width="${metadata.width+autoMargin*2}" height="${metadata.height+autoMargin*2}">
        <style>
          .wm {
            fill: rgba(0,0,0,${Number(opacity)/100});
            font-size: ${fontSize}px;
            font-family: Arial, sans-serif;
            font-weight: bold;
          }
        </style>
        <text x="${x}" y="${y}" text-anchor="${anchor}" class="wm">
          ${text}
        </text>
      </svg>
    `;
   
      const output= await extendedImage
      .composite([{input:Buffer.from(svg)}]) 
      .toBuffer()
         //-------- 100% - Completed ----------------
      sendProgress(100, "Completed");
      // close SSE
    global.progress?.end();
        res.set("Content-Type", `image/${metadata.format}`);
        res.send(output);
    }
    catch(err){
        console.log(err);
        
    }
    
}

//--------------------------WaterMark logo on Image--------------
export const WaterMarkTypeLogo=async(req,res)=>{
try{
 const OriginalImg=req.files?.image?.[0]; // real image
 const logoImg=req.files?.logo?.[0] // logo image put on real image
 let{scale,position,opacity}=req.body;
   if (!OriginalImg || !logoImg) {
       return res.status(400).json({ message: "No image uploaded" });
     }
    const sendProgress = (progress, status) => {
      global.progress?.write(
        `data: ${JSON.stringify({ progress, status })}\n\n`
      );
    };
//------------------Processing:40%---------------
sendProgress(40,"Processing")
    /* ---------- Base Image ---------- */
    const baseImg = sharp(OriginalImg.buffer);
    const meta = await baseImg.metadata();

    /* ---------- Resize Logo ---------- */
    const logoWidth = Math.round(meta.width * (Number(scale) / 100));

  const logoResize =await sharp(logoImg.buffer)
  .resize({ width: logoWidth, fit: "inside" })
  .toBuffer()

const logoMeta = await sharp(logoResize).metadata();



    /* ---------- REAL Margin ---------- */
    const padding = 15;
    const autoMargin =position==='center'?0: logoMeta.height + padding * 2;

/* ---------- Extend image (REAL margin) ---------- */
      const extendedImage=baseImg.extend({
       top:autoMargin,
      bottom:autoMargin ,
      left: autoMargin ,
      right: autoMargin ,   background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
       /* ---------- New canvas size ---------- */
    const canvasWidth =
      meta.width +
      (position.endsWith("left") ? autoMargin : 0) +
      (position.endsWith("right") ? autoMargin : 0);

    const canvasHeight =
      meta.height +
      (position.startsWith("top") ? autoMargin : 0) +
      (position.startsWith("bottom") ? autoMargin : 0);
      const{left,top}=onWaterMarkPositionLogo(canvasWidth,
  canvasHeight,
  logoMeta,
  padding,
  position,
  autoMargin)
  //-----------------------Adding Watermark:80%------------------
  sendProgress(80,"Adding Watermark")
   /* ---------- SVG wrapper for opacity ---------- */
    const svg = `
      <svg width="${logoMeta.width}" height="${logoMeta.height}">
        <image
          href="data:image/${logoMeta.format};base64,${logoResize.toString("base64")}"
          width="100%"
          height="100%"
          opacity="${Math.max(0, Math.min(1, opacity / 100))}"
        />
      </svg>
    `;
      const output=await extendedImage
 .composite([
  {
    input:Buffer.from(svg),
    left,
    top,
  }
 ]).toBuffer()
//---------------completed:100%--------------------------- 
  sendProgress(100,"Completed")
 res.set("Content-Type", `image/${meta.format}`);
    res.send(output);
 
}
catch(err){
  console.log(err);
  
  res.status(500).json({ message: "Logo watermark failed" });
}
}















/* ---------- Watermark Position Helper ---------- */
const WaterMarkPosition=(position,metadata,textSize,margin,padding)=>{
    let x,y,anchor;
    switch(position){
        case "top-left":
                x=padding+margin,y=padding+textSize,anchor="start"
                break;
        case "top-right":
            x=metadata.width-padding*2+margin,y=padding+textSize,anchor="end"
            break;
        case "top-center":
            x=metadata.width/2+margin,y=padding+textSize,anchor="middle"
            break;
        case "center":
x=(metadata.width/2)+margin,y=metadata.height/2+margin, anchor="middle"
        break;
        case "bottom-left":
            x=padding+margin,y=metadata.height+margin+(margin*2-textSize)/2,anchor="start"
            break;
        case "bottom-right":
            x=metadata.width-padding*2+margin,y=metadata.height+margin+(margin*2-textSize)/2,anchor="end"
            break;
        case "bottom-center":
          x=metadata.width/2+margin,y=metadata.height+margin+(margin*2-textSize)/2,anchor="middle"
          break;
        default: // bottom-right
            x = metadata.width - padding+margin;
            y = metadata.height - padding+margin;
            anchor = "end";
        }
        x=Math.round(x);
        y=Math.round(y)
        return {x,y,anchor}
}

const onWaterMarkPositionLogo = (
  canvasWidth,
  canvasHeight,
  logoMeta,
  padding,
  position,
  autoMargin
) => {
  let left = padding;
  let top = padding;

  switch (position) {
    case "top-left":
      left = padding+autoMargin;
      top = padding;
      break;

    case "top-center":
      left = (canvasWidth - logoMeta.width) / 2+autoMargin;
      top = padding;
      break;

    case "top-right":
      left = canvasWidth - logoMeta.width - padding;
      top = padding;
      break;

    case "center":
      left = (canvasWidth - logoMeta.width) / 2+autoMargin;
      top = (canvasHeight - logoMeta.height) / 2+autoMargin;
      break;

    case "bottom-left":
      left = padding+autoMargin;
      top = canvasHeight - logoMeta.height - padding+autoMargin;
      break;

    case "bottom-center":
      left = (canvasWidth - logoMeta.width) / 2+autoMargin;
      top = canvasHeight - logoMeta.height - padding+autoMargin;
      break;
    case "bottom-right":
  left = canvasWidth - logoMeta.width - padding;
  top = canvasHeight - logoMeta.height - padding+autoMargin;
  break;

    default: // bottom-right
      left = canvasWidth - logoMeta.width - padding;
      top = canvasHeight - logoMeta.height - padding+autoMargin;
  }

  return { left: Math.round(left), top: Math.round(top) };
};
