import PDFDocument from "pdfkit"
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
res.write(`data:${JSON.stringify({progress:0,status:"Uploading"})}\n\n`);
}

//--------------helper:send real time updates to client----------------------
const sendProgress=(progress,status)=>{
  
            global.progress?.write(`data:${JSON.stringify({progress,status})}\n\n`)
        }
export const Img_Pdf_Conversion=async(req,res)=>{
   try{
   const { PageSize, orientation, margin, scale: fit_type, pageNumbers: pageNoPosition } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }
   //----------40% - processing-------------
     sendProgress(40, "Processing");
    const marginMap = {
      none: 0,
      small: 10 * 2.83465,
      medium: 20 * 2.83465,
      large: 30 * 2.83465
    };
    const Margin = marginMap[margin] ?? 0;
    

    const doc = new PDFDocument({
      autoFirstPage: false,
      size: PageSize,
      layout: orientation,
      bufferPages: true // ⭐ REQUIRED for page numbers
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Images.pdf"'
    );

    doc.pipe(res);

    /* ---------------- ADD PAGES ---------------- */
    let count=0,total=files.length;
    for (const file of files) {
      doc.addPage({
        size: PageSize,
        layout: orientation,
        margins: {
          top: Margin,
          bottom: Margin,
          left: Margin,
          right: Margin
        }
      });

      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;

      const contentWidth = pageWidth - Margin * 2;
      const contentHeight = pageHeight - Margin * 2;

      const meta = await sharp(file.buffer).metadata();

      const { width, height } = onImageScale(
        fit_type,
        meta.width,
        meta.height,
        contentHeight,
        contentWidth,
      );

      const x = (pageWidth - contentWidth) / 2
      const y = (pageHeight-contentHeight) / 2;

      const imgBuffer = await sharp(file.buffer)
        .resize(width, height, {
          fit: fit_type === "cover" ? "cover" : fit_type === "stretch" ? "fill" : "inside"
        })
        .toBuffer();

      doc.image(imgBuffer, x, y, { width, height });
      count++;
  //-------------------------Creating PDF:40 to 80%------------------------    
      const percent=Math.floor(40+(count/total)*40);
        sendProgress(percent,"Creating PDF")
    }

    /* ---------------- PAGE NUMBERS (AFTER CONTENT) ---------------- */
    count=0;
    if (pageNoPosition !== "none") {
      const range = doc.bufferedPageRange();

      for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        insertPageNumber(
          doc,
          i + 1,
          range.count,
          pageNoPosition,
          Margin
        );
      }
   //--------------------------Creating PDF:80 to 100%------------------------      
      count++;
      const percent=Math.floor(80+(count/total)*20);
        sendProgress(percent,"Creating PDF")
    }
//----------------------------Completed:100%--------------------
  sendProgress(100,"Completed")
    doc.end();
   }
   catch(_){
    return res.status(500).json({ message: "Failed to create PDF" });
   }
    
}

//-----------Scale the image to fit according to the user choice---------
export const onImageScale=(fit_type,ImageWidth,ImageHeight,contentHeight,contentWidth)=>{
if(fit_type==='stretch'){
return {
  width:Math.round(contentWidth),
  height:Math.round(contentHeight)
}
}
else if(fit_type==='cover'){
  const scale=Math.max(contentWidth/ImageWidth,contentHeight/ImageHeight);
  return{
    width:Math.round(ImageWidth*scale),
    height:Math.round(ImageHeight*scale)
  }
}

 // default: contain
  const scale= Math.min(contentWidth/ImageWidth,contentHeight/ImageHeight);
return{
  width:Math.round(ImageWidth*scale),
  height:Math.round(ImageHeight*scale)
}
}

//------------helper:Show page number-----------
const insertPageNumber=( doc,
  pageNo,
  totalPages,
  Position,
  margin)=>{
doc.fontSize(15);
  const text = `Page ${pageNo} of ${totalPages}`;
  const textWidth = doc.widthOfString(text);
  const textHeight = doc.currentLineHeight();
  const PageWidth = doc.page.width;
  const PageHeight = doc.page.height;
let x=0,y=0;
switch(Position){
  case "top-left":
    x=margin; y=margin/2; break;
  case "top-center":
    x=(PageWidth-textWidth)/2; y=margin/2; break;
  case "top-right":
    x=PageWidth-margin-textWidth; y=margin; break;
  case "bottom-left":
    x=margin; y=PageHeight-((textHeight*2+margin)); break;
  case "bottom-center":
    x=(PageWidth-textWidth)/2;
    y=PageHeight-((textHeight*2+margin));
    break;
  case "bottom-right":
    x=(PageWidth-margin-textWidth);
    y=PageHeight-((textHeight*2+margin));
    
    break;
  default :
  return;
}
  doc.text(text, x, y);
}