import { Activity } from 'react'
import { FiType } from 'react-icons/fi'
import { IoImageOutline } from "react-icons/io5";
import DragAndDrop from './Select_Img';
import WaterMark_Setting from './WaterMark_Setting';
import Preview_Img from './Preview_Img';
import { useDispatch, useSelector } from 'react-redux';
import { onWaterMarkType } from '../features/WaterMark/Image_WaterMark';
import Download from '../UI/Download';
const Image_Watermark = () => {
  const{WaterMarkType}=useSelector(res=>res?.WaterMark)
  const dispatch=useDispatch()
  return (
   <section className=' mx-auto max-w-full lg:max-w-[78%]'>
     <div className='bg-white rounded-xl shadow-lg px-6 py-8 md:p-10 mb-6'>
       <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
                Watermark Type
              </label>
              <div className="flex gap-3 text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(0.875rem,0.4816rem+0.6148vw,1.25rem)]">
                <button
                  onClick={() => dispatch(onWaterMarkType("text"))}
                  className={`cursor-pointer flex-1 px-4 py-3 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${
                    WaterMarkType === 'text'
                      ? 'border-[#250BEC] bg-blue-50 text-[#250BEC]'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <FiType className="w-4 h-4" />
                  Text
                </button>
                <button
                  onClick={() =>dispatch(onWaterMarkType("image")) }
                  className={`cursor-pointer flex-1 px-4 py-3 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${
                    WaterMarkType === 'image'
                      ? 'border-[#250BEC] bg-blue-50 text-[#250BEC]'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <IoImageOutline className="w-4 h-4" />
                  Image
                </button>
              </div>
       </div>

       <div className='mb-8'>
       <DragAndDrop/>
       </div>
       <WaterMark_Setting WaterMarkType={WaterMarkType}/>
       
       <Download data={"Add Watermark"}/>
       
    
     </div>
     <Preview_Img tab={"Watermark"} />
     </section>
  )
}

export default Image_Watermark