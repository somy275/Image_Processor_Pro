import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onPageMargin } from '../features/Pdf/CreatePdfSlice'

const Margin = () => {
  const{margin}=useSelector(res=>res?.Pdf)
  const dispatch=useDispatch()
  return (
 <div className='text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.525rem)] lg:text-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)]'>
          <label className="block font-medium text-gray-700 mb-2">
            Margins (mm)
          </label>
          <select
            value={margin}
            onChange={(e) => dispatch(onPageMargin(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="none">None (0mm)</option>
            <option value="small">Small (10mm)</option>
            <option value="medium">Medium (20mm)</option>
            <option value="large">Large (30mm)</option>
          </select>
        </div>
  )
}

export default Margin