import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import Page_Size from '../UI/Page_Size';
import Orientation from '../UI/Orientation';
import Margin from '../UI/Margin';
import Image_Fit from './Image_Fit';
import Page_Numbers from './Page_Numbers';
const Pdf_Setting = () => {
  return (
 <div className='mt-6 p-4 bg-gray-50 rounded-lg space-y-4'>
 <div className="flex items-center gap-2 mb-6">
        <IoSettingsOutline className="w-5 h-5 text-gray-700" />
        <h3 className="text-[clamp(1.125rem,0.925rem+1.6vw,1.375rem)] min-[450px]:text-[clamp(1.3125rem,1.0625rem+2vw,1.625rem)] lg:text-[clamp(1.0425rem,0.5591rem+0.6148vw,1.2375rem)] font-semibold text-gray-800">PDF Settings</h3>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Page_Size/>
        <Orientation/>
        <Margin/>
        <Image_Fit/>
        <Page_Numbers/>
       </div>
 </div>
  )
}

export default Pdf_Setting