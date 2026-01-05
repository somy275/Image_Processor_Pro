import { CompressMultipleImg, CompressSingleImg } from "../features/Compress/CompressSlice";
 // ---------- Helper: Create Blob URL ----------
const createBlobUrl=(blob)=>URL.createObjectURL(blob)

export const Compress_Images=(dispatch,Images,quality)=>{
// ---------- Helper: Auto Download ----------
const downloadFile=(url,fileName)=>{
    const a=document.createElement("a");
    a.href=url;
    a.download=fileName;
    a.click();
    URL.revokeObjectURL(url)
}
try{
     // ---------- Prepare FormData ----------
const form=new FormData()
form.append("Quality",quality);
if(Images.length===1){
    const file = Images[0].file ?? Images[0];
    form.append("image",file);
    dispatch(CompressSingleImg(form)).then((res)=>{
        if(!res.payload) return;
   const blobUrl=createBlobUrl(res.payload)
        const fileName=file?.name
        downloadFile(blobUrl,fileName)
    })
}
    else{
        Images.forEach(files=>form.append("images",files.file ?? files))
        dispatch(CompressMultipleImg(form)).then((res)=>{
            if(!res.payload) return;
   const blobUrl=createBlobUrl(res.payload)
        const fileName="Compressed.zip"
        downloadFile(blobUrl,fileName)
        })
    }
}
catch(err){
    console.log(err);
    
}
}