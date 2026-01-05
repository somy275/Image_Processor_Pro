import React, { useState } from 'react'
import DragAndDrop from '../components/Select_Img'
import Preview_Img from '../components/Preview_Img'
import { useDispatch } from 'react-redux'
import { SelectedImgFormat, SelectQuality } from '../features/Image_Upload/ImageUploadSlice'

const Convert = () => {
  const [selectedFormat, setSelectedFormat] = useState("")
  const dispatch=useDispatch()
  const [quality, setQuality] = useState(90)

  const onSelectFormat=(e)=>{
    setSelectedFormat(e.target.value)
dispatch(SelectedImgFormat({format:e.target.value}))
    
  }
  return (
    <section className=' mx-auto max-w-full lg:max-w-[78%]'>
     <div className='bg-white text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.525rem)] lg:text-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)] rounded-xl shadow-lg px-6 py-8 md:p-10 mb-6'>
      <DragAndDrop/>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <label className="block  font-semibold text-gray-700 mb-2">
                Convert to:
              </label>
              <select
                value={selectedFormat}
                onChange={onSelectFormat}
                className="w-full text-[clamp(0.8075rem,0.7875rem+1.2vw,0.985rem)] min-[450px]:text-[clamp(0.995rem,0.733rem+1.3937vw,1.195rem)] lg:text-[clamp(0.8825rem,0.3191rem+0.6348vw,1.2475rem)] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WEBP</option>
                  <option value="avif">AVIF</option>
              </select>
            </div>
             <div className=" mt-6 p-4 bg-gray-50 rounded-lg">
                 <label className="block  font-semibold text-gray-700 mb-2">
                Quality: {quality+"%"}
              </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) =>{ dispatch(SelectQuality(parseInt(e.target.value))); setQuality(parseInt(e.target.value))}}
                    className="flex-1 h-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>
                    </div>
                <Preview_Img tab={"Convert"}/>
    </section>
  )
}

export default Convert