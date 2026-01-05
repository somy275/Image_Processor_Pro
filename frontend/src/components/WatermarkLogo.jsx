import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onWaterMarkLogo } from '../features/WaterMark/Image_WaterMark'

const WatermarkLogo = () => {
    const{WaterMarkLogo}=useSelector(res=>res?.WaterMark)
    const dispatch=useDispatch()
    //-------------helper to get WaterMark logo----------------//
    const onLogo=(e)=>{
const file=e.target.files[0]
if(file){
    dispatch(onWaterMarkLogo(file))
    
}
  }
  console.log(WaterMarkLogo);
  
  return (
    <div>
         <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload WaterMark Image
                </label>
<input
type="file"
accept='image/*'
onChange={onLogo}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#250BEC] focus:border-transparent"
/>
    </div>
  )
}

export default WatermarkLogo