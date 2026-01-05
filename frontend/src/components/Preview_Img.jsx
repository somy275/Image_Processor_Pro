import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegTrashAlt } from "react-icons/fa";
import { OpenCloseEditor, remove, removeAll} from '../features/Image_Upload/ImageUploadSlice';
import Download from '../UI/Download';
const Preview_Img = ({tab}) => {
    const Uploadedfiles= useSelector((state)=>state.Upload.Image_files)
   const dispatch=useDispatch()
const removeImage=(id)=>{
  dispatch(remove(id))
}

  return (
  <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[clamp(1.0625rem,0.8125rem+2vw,1.375rem)] min-[450px]:text-[clamp(1.0625rem,0.6125rem+3.6vw,1.625rem)] lg:text-[clamp(1.1775rem,0.6329rem+0.8197vw,1.6875rem)] font-bold text-gray-800">
                Uploaded Images ({Uploadedfiles.length})
              </h2>
              <button
              data-testid="clear-all-btn"
                onClick={()=>dispatch(removeAll())}
                className="flex cursor-pointer items-center gap-2 text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(0.875rem,0.4716rem+0.6148vw,1.25rem)] px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaRegTrashAlt className="w-4 h-4" />
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {Uploadedfiles?.map((image,idx) => (
                
                <div
                  key={idx}
                  className="relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <img
                    src={image?.image}
                    alt={image?.file?.name ?? image?.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => dispatch(OpenCloseEditor({data:true,image:image?.image,index:idx}))}
                    className="cursor-pointer absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold">
                      Edit Image
                    </span>
                  </button>
                  <div className="p-3 bg-gray-50">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {image?.file?.name ?? image?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {((image?.file?.size  ?? image?.size)/1024/1024).toFixed(2)+`${((image?.file?.size ?? image.size)/1024/1024).toFixed(2)>=1?" MB":" KB"}`}
                    </p>
                  </div>
                  <button
                  data-testid={`delete-btn-${idx}`}
                    onClick={() => removeImage(idx)}
                    className="cursor-pointer absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                  </button>
                </div>
))}
</div>
{
  Uploadedfiles.length>0 && tab!="Watermark" && <Download data={tab} />
}

</div>

  )
}

export default Preview_Img