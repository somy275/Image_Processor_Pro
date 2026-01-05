import React from 'react'
import { FaDownload } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { ConvertMultipleImg, ConvertSingleImg } from '../features/Image_Upload/ConvertImageSlice'
import Processing_Percentage from './Processing_Percentage'
import { Convert_Images } from '../services/Convert_Images'
import { Resize_Images } from '../services/Resize_Images'
import { Pdf_Images } from '../services/Pdf_Images'
import { WaterMark_Img } from '../services/WaterMark_Images'
import { Compress_Images } from '../services/Compress_Images'

const Download = ({data}) => {
  const {ImgFormat, Image_files, quality}=useSelector(res=>res?.Upload)
  const {ResizeScale,ResizeHeight,ResizeWidth,AspectRatio}=useSelector(res=>res?.Resize); 
  const{PageSize,orientation,margin,fit_type,pageNumbers}=useSelector(res=>res?.Pdf) 
   const{WaterMarkType,WaterMarkText,WaterMarkTextSize,WaterMarkPosition,WaterMarkOpacity,WaterMarkScale,WaterMarkLogo}= useSelector(res=>res?.WaterMark)
   const{quality:CompressQuality}=useSelector(res=>res?.Compress)
  const dispatch=useDispatch()
  const processAndDownload = () => {
    if (data==="Convert") {  // for image conversion
      Convert_Images(dispatch,Image_files,ImgFormat,quality)
  }
  else if(data==="Resize"){ //for image resize
    Resize_Images(dispatch,Image_files,ResizeScale,ResizeHeight,ResizeWidth,AspectRatio)  
  }
  else if(data==="Pdf"){
    
    Pdf_Images(dispatch,Image_files,PageSize,orientation,margin,fit_type,pageNumbers)
  }
  else if(data==="Compress"){
    Compress_Images(dispatch,Image_files,CompressQuality)
  }
  else {
    WaterMark_Img(dispatch,Image_files,WaterMarkType,WaterMarkText,WaterMarkTextSize,WaterMarkPosition,WaterMarkOpacity,WaterMarkScale,WaterMarkLogo)
  }

};





  
  return (
   <button
                  onClick={processAndDownload}
                  className="cursor-pointer text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(0.875rem,0.4816rem+0.6148vw,1.25rem)]  flex-1 flex mx-auto items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {data} 
                </button>
  )
}

export default Download