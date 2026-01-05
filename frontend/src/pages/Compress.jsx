import React from 'react'
import DragAndDrop from '../components/Select_Img'
import { useDispatch, useSelector } from 'react-redux'
import { onQualityChange } from '../features/Compress/CompressSlice'
import Preview_Img from '../components/Preview_Img'

const Compress = () => {
  const{quality}=useSelector(res=>res?.Compress)
  const dispatch=useDispatch()
  return (
 <section className=' mx-auto max-w-full lg:max-w-[78%]'>
     <div className='bg-white rounded-xl shadow-lg px-6 py-8 md:p-10 mb-6'>
      <DragAndDrop/>
      <div className=" mt-6 p-4 bg-gray-50 rounded-lg">
                       <label className="block text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.525rem)] lg:text-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)] font-semibold text-gray-700 mb-2">
                      Quality: {quality+"%"}
                    </label>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={quality}
                          onChange={(e) =>{ dispatch(onQualityChange(parseInt(e.target.value)))}}
                          className="flex-1 h-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                      </div>
      </div>
                        <Preview_Img tab={"Compress"}/>
      </section>
  )
}

export default Compress