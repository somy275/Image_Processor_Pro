import { useDispatch, useSelector } from "react-redux"
import { onPageNo } from "../features/Pdf/CreatePdfSlice"

const Page_Numbers = () => {
  const dispatch=useDispatch()
  const {pageNumbers}=useSelector(res=>res?.Pdf)
  return (
   <div className="text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.525rem)] lg:text-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)]">
          <label className="block  font-medium text-gray-700 mb-2">
            Page Numbers
          </label>
          <select
            value={pageNumbers}
            onChange={(e)=>dispatch(onPageNo(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="none">None</option>
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="top-center">Top Center</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
          </select>
        </div>
  )
}

export default Page_Numbers