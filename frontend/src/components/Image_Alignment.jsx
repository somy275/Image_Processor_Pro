
import { LuAlignCenter, LuAlignLeft, LuAlignRight } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { onPageAlign } from "../features/Pdf/CreatePdfSlice";
const Image_Alignment = () => {
  const dispatch=useDispatch();
  const{alignment}= useSelector(res=>res?.Pdf)
  return (
   <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Alignment
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(onPageAlign("left"))}
              className={`flex-1 px-3 py-2 rounded-lg border-2 transition-colors ${
                alignment === 'left'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <LuAlignLeft className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => dispatch(onPageAlign("center"))}
              className={`flex-1 px-3 py-2 rounded-lg border-2 transition-colors ${
                alignment === 'center'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <LuAlignCenter className="w-4 h-4 mx-auto" />
            </button>
            <button
               onClick={() => dispatch(onPageAlign("right"))}
              className={`flex-1 px-3 py-2 rounded-lg border-2 transition-colors ${
              alignment === 'right'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <LuAlignRight className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>
  )
}

export default Image_Alignment