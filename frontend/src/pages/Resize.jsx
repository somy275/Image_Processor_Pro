import DragAndDrop from '../components/Select_Img'
import { FiZoomIn, FiZoomOut } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { onAspectRatio, onResizeHeight, onResizeScale, onResizeScaleDecrease, onResizeScaleIncrease, onResizeWidth } from '../features/Image_Resize/ResizeImageSlice'
import Preview_Img from '../components/Preview_Img'
import { useEffect, useState } from 'react'

const Resize = () => {
  const [ResizeScaleStatus, setResizeScaleStatus] = useState("original")
  const dispatch=useDispatch()
  const {ResizeScale,ResizeHeight,ResizeWidth,AspectRatio}=useSelector(res=>res?.Resize)

  
  useEffect(()=>{
const scale_status=ResizeScale/100;
if(scale_status===1){
  setResizeScaleStatus("original")
}
else if(scale_status===2){
 setResizeScaleStatus("2x")
}
else{
 setResizeScaleStatus(scale_status+"x")
}
  },[ResizeScale])
  
  return (
     <section className=' mx-auto max-w-full lg:max-w-[78%]'>
     <div className='bg-white  rounded-xl shadow-lg px-6 py-8 md:p-10 mb-6'>
<DragAndDrop/>
<div className='mt-6 p-4 text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.525rem)] lg:text-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)] bg-gray-50 rounded-lg space-y-4'>
  <div className='p-4  bg-white rounded-lg border border-gray-200'>
    <label className="block  font-semibold text-gray-700 mb-3">
       Resize by Scale: {ResizeScale}% ({ResizeScaleStatus})
    </label>
<div className="flex items-center gap-4">
                  <FiZoomOut title='Decrease' onClick={()=>dispatch(onResizeScaleDecrease())} className={`${ResizeScale===10 ?"pointer-events-none":"cursor-pointer"} w-5 h-5 min-[450px]:h-6 min-[450px]:w-6 md:h-[1.6rem] md:w-[1.6rem] lg:h-[clamp(1.125rem,0.666rem+0.7172vw,1.5625rem)] lg:w-[clamp(1.125rem,0.666rem+0.7172vw,1.5625rem)] text-gray-500`} />
                   <input
                    type="range"
                    min="10"
                    max="200"
                    value={ResizeScale}
                    onChange={(e) => dispatch(onResizeScale(parseInt(e.target.value)))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <FiZoomIn title='Increase' onClick={()=>dispatch(onResizeScaleIncrease())} className={`${ResizeScale===200 ?"pointer-events-none":"cursor-pointer"} w-5 h-5 md:h-[1.6rem] md:w-[1.6rem] lg:h-[clamp(1.125rem,0.666rem+0.7172vw,1.5625rem)] lg:w-[clamp(1.125rem,0.666rem+0.7172vw,1.5625rem)] text-gray-500`} />
                  </div>
                   <p className="text-[clamp(0.6875rem,0.4875rem+1.6vw,0.9375rem)] min-[450px]:text-[clamp(0.8125rem,0.5185rem+1.0453vw,1.1875rem)] lg:text-[clamp(0.7205rem,0.1891rem+0.6148vw,0.9375rem)] text-gray-500 mt-2">
                  Drag the slider to scale the image from 10% to 200%
                </p>
  </div>
   <div className="text-center  font-semibold text-gray-500">OR</div>
  <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block  font-semibold text-gray-700 mb-2">
                    Width (px)
                  </label>
                   <input
                    type="number"
                    value={ResizeWidth}
                    onChange={(e) => dispatch(onResizeWidth(e.target.value))}
                    placeholder="Auto"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  </div>
                  <div className="flex-1">
                  <label className="block  font-semibold text-gray-700 mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={ResizeHeight}
                    onChange={(e) => dispatch(onResizeHeight(e.target.value))}
                    placeholder="Auto"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={AspectRatio}
                  onChange={(e) => dispatch(onAspectRatio(e.target.checked))
                  }
                  className="w-4 h-4 min-[450px]:h-[max(1rem,3vw)] min-[450px]:w-[max(1rem,3vw)] md:h-[clamp(1.1875rem,0.4375rem+1.5625vw,1.4375rem)] md:w-[clamp(1.1875rem,0.4375rem+1.5625vw,1.4375rem)] lg:h-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)] lg:w-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)] rounded accent-indigo-600"
                />
                <span className=" font-medium text-gray-700">
                  Maintain aspect ratio
                </span>
              </label>
</div>
     </div>
       <Preview_Img tab={"Resize"}/>
     </section>
  )
}

export default Resize