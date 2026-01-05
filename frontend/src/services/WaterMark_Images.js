import { WaterMarkTypeLogo, WaterMarkTypeText } from "../features/WaterMark/Image_WaterMark";


  // ---------- Helper: Create Blob URL ----------
const createBlobUrl=(blob)=>URL.createObjectURL(blob)
  // ---------- Helper: Auto Download ----------
const downloadFile=(url,fileName)=>{
const a=document.createElement("a");
a.href=url;
a.download=fileName
a.click();
URL.revokeObjectURL(url)
}
export const WaterMark_Img = (
  dispatch,
  Image_files,
  WaterMarkType,
  WaterMarkText,
  WaterMarkTextSize,
  WaterMarkPosition,
  WaterMarkOpacity,
  WaterMarkScale,
  WaterMarkLogo
) => {
  try {
    const form = new FormData();
    const file=Image_files[0].file ?? Image_files[0]
    form.append("position", WaterMarkPosition);
    form.append("opacity", WaterMarkOpacity);
form.append("image",file)
    if (WaterMarkType === "text") {
      form.append("text", WaterMarkText);
      form.append("textSize", WaterMarkTextSize);
        dispatch(WaterMarkTypeText(form)).then((res) => {
        if (!res?.payload) return;
       const blobUrl=createBlobUrl(res.payload)
       downloadFile(blobUrl,file?.name)
      });
    }
    else{
      form.append("scale",WaterMarkScale);
      form.append("logo",WaterMarkLogo[0]);
      dispatch(WaterMarkTypeLogo(form)).then((res)=>{
        if(!res.payload) return;
        const blobUrl=createBlobUrl(res.payload)
        downloadFile(blobUrl,file?.name)
        
      })
    }
  } catch (err) {
    console.error(err);
  }
};
