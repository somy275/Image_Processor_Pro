import { Create_Pdf } from "../features/Pdf/CreatePdfSlice";

export const Pdf_Images=(dispatch,Image_files,PageSize,orientation,margin,fit_type,pageNumbers)=>{
//------------Create Blob Url-------------
const createBlobUrl=(blob)=>URL.createObjectURL(blob)
//-----------Auto Download-----------------
const downloadFile=(url)=>{
const a=document.createElement("a");
a.href=url;
a.download="Images.pdf"
a.click()
}
//-----------Prepare form data---------------
const form=new FormData();
form.append("PageSize",PageSize);
form.append("orientation",orientation)
form.append("margin",margin)
form.append("scale",fit_type)
form.append("pageNumbers",pageNumbers)
Image_files.forEach(files=>form.append("Pdf",files.file ?? files))
console.log(form);

dispatch(Create_Pdf(form)).then((res)=>{
    if(!res.payload) return;
    const url=createBlobUrl(res.payload)
    downloadFile(url)
})
}