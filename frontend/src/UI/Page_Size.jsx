import { useDispatch, useSelector } from 'react-redux';
import { onPageSizeChange } from '../features/Pdf/CreatePdfSlice';

const Page_Size = () => { //---------------page size---------------
 const {PageSize} =useSelector(res=>res?.Pdf)
 const dispatch=useDispatch() 
  return (
  <div className='text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.525rem)] lg:text-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)]'>
          <label className="block  font-medium text-gray-700 mb-2">
            Page Size
          </label>
          <select
            value={PageSize}
            onChange={(e) => dispatch(onPageSizeChange(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="A4">A4 (210 × 297 mm)</option>
            <option value="letter">Letter (8.5 × 11 in)</option>
            <option value="legal">Legal (8.5 × 14 in)</option>
            <option value="A3">A3 (297 × 420 mm)</option>
            <option value="A5">A5 (148 × 210 mm)</option>
          </select>
        </div>
  )
}

export default Page_Size