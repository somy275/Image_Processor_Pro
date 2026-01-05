import React from 'react'
import { FiLayout } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { onPageOrientation } from '../features/Pdf/CreatePdfSlice'


const Orientation = () => { //---------Orientation----------
  const {orientation}=useSelector(res=>res?.Pdf)
  const dispatch=useDispatch()
  return (
    <div className='text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.525rem)] lg:text-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)]'>
          <label className="block  font-medium text-gray-700 mb-2">
            Orientation
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(onPageOrientation("portrait"))}
              className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                orientation === 'portrait'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <FiLayout className="w-4 h-4 mx-auto mb-1" />
              Portrait
            </button>
            <button
             onClick={() =>dispatch(onPageOrientation("landscape")) }
              className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                orientation === 'landscape'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <FiLayout className="w-4 h-4 mx-auto mb-1 rotate-90" />
              Landscape
            </button>
          </div>
        </div>
  )
}

export default Orientation