import { ResizeMultipleImg, ResizeSingleImg } from "../features/Image_Resize/ResizeImageSlice";

export const Resize_Images=(dispatch,Image_files,ResizeScale,ResizeHeight,ResizieWidth,AspectRatio)=>{
   // ---------- Helper: Create Blob URL ----------
  const createBlobUrl = (blob) => URL.createObjectURL(blob);
    // ---------- Helper: Auto Download ----------
  const downloadFile = (url, fileName) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url); // cleanup
  };
   //-----------Prepare form data------------
    const form=new FormData();
    form.append("ResizeScale",ResizeScale);
    form.append("ResizeHeight",ResizeHeight);
    form.append("ResizeWidth",ResizieWidth);
    form.append("AspectRatio",AspectRatio)
    //----------handle single image----------
    if(Image_files.length===1){
    const file = Image_files[0].file ?? Image_files[0];
    form.append("SingleImg",file);
    dispatch(ResizeSingleImg(form)).then((res)=>{
if(!res.payload) return
const blobUrl=createBlobUrl(res.payload);
downloadFile(blobUrl, file?.name);
    })
}
// -------------handle multiple images--------------
else{
    
    Image_files.forEach(files=>form.append("MultipleImg",files.file ?? files));
    dispatch(ResizeMultipleImg(form)).then((res)=>{
        if(!res.payload) return;
        const blobUrl=createBlobUrl(res.payload);
 downloadFile(blobUrl, "Resized.zip");
        
    })
}
}