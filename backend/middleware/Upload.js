import multer from "multer";
const storage=multer.memoryStorage()  // store files in memory as Buffer
const fileFilter=(req,file,cb)=>{
  const allowed = ["image/jpeg", "image/png", "image/webp","image/avif"];
  if(allowed.includes(file.mimetype)){
    cb(null,true)
  }
  else {
    cb(new Error("Only jpg, png, webp, avif allowed"), false);
  }
}
 const upload=multer({
    storage,fileFilter
 })

 export default upload