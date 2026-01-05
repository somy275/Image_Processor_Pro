import React, { Activity } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onWaterMarkOpacity, onWaterMarkPosition, onWaterMarkScale, onWaterMarkSize, onWaterMarkText } from '../features/WaterMark/Image_WaterMark'
import WatermarkLogo from './WatermarkLogo'

const WaterMark_Setting = ({WaterMarkType}) => {
 const{WaterMarkText,WaterMarkTextSize,WaterMarkPosition,WaterMarkOpacity,WaterMarkScale}= useSelector(res=>res?.WaterMark)
  const dispatch=useDispatch();
  
  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.525rem)] lg:text-[clamp(0.8825rem,0.3191rem+0.6148vw,1.1875rem)]">
            <Activity mode={WaterMarkType==="text"?"visible":"hidden"}>
                <div>
                  <label className="block  font-medium text-gray-700 mb-2">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    value={WaterMarkText}
                     onChange={(e) => dispatch(onWaterMarkText(e.target.value))}
                    placeholder="Enter watermark text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#250BEC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size
                  </label>
                  <select
                    value={WaterMarkTextSize }
                     onChange={(e) => dispatch(onWaterMarkSize(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#250BEC] focus:border-transparent"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                  </select>
                </div>
                </Activity>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <select
                  value={WaterMarkPosition}
                  onChange={(e) => dispatch(onWaterMarkPosition(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#250BEC] focus:border-transparent"
                >
                  <option value="center">Center</option>
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="top-center">Top Center</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-center">Bottom Center</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opacity
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={WaterMarkOpacity}
                  onChange={(e) => dispatch(onWaterMarkOpacity((e.target.value)))}
                  className="w-full accent-[#250BEC]"
                />
                <div className="text-xs text-gray-500 text-center mt-1">
                  {WaterMarkOpacity}%
                </div>
              </div>
              <Activity  mode={WaterMarkType!="text"?"visible":"hidden"}>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scale
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={WaterMarkScale}
                  onChange={(e) => dispatch(onWaterMarkScale((e.target.value)))}
                  className="w-full accent-[#250BEC]"
                />
                <div className="text-xs text-gray-500 text-center mt-1">
                  {WaterMarkScale}%
                </div>
</div>
<div>
  <WatermarkLogo/>
</div>
              </Activity>
              </div>
       </div>
  )
}

export default WaterMark_Setting