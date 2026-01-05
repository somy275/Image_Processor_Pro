import React, { useState, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowsRotate } from "react-icons/fa6";
import { IoCrop } from "react-icons/io5";
import { OpenCloseEditor, updateSelectedImage} from '../features/Image_Upload/ImageUploadSlice';
import Cropper from "react-easy-crop"
import { getCropRotateImage } from '../utils/getUpdatedImage';

const EditImage = () => {
const res=useSelector(state => state.Upload)
  const dispatch = useDispatch()

  const [cropMode, setCropMode] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
const[rotation,setRotation]=  useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  
console.log(croppedAreaPixels);

  // ⭐ Aspect State
  const [aspect, setAspect] = useState(undefined) 
  // null = freeform

  // When cropping finishes
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  // List of selectable aspect ratios
  const aspectOptions = [
    { label: "Free", value: undefined },
    { label: "1 : 1", value: 1 / 1 },
    { label: "4 : 5", value: 4 / 5 },
    { label: "3 : 2", value: 3 / 2 },
    { label: "4 : 3", value: 4 / 3 },
    { label: "16 : 9", value: 16 / 9 },
    { label: "9 : 16", value: 9 / 16 },
  ];

const getUpdatedImage=async()=>{
  try{
    if(croppedAreaPixels && rotation!=0 || croppedAreaPixels && cropMode){ 
      const updatedBlob=await getCropRotateImage(res.SelectedCropImage,croppedAreaPixels,rotation)
      const image_files=res.Image_files[res.SelectCropImageIdx].file??res.Image_files[res.SelectCropImageIdx]
      console.log((image_files.name));
      const file=new File([updatedBlob],(image_files.name) ,{type:image_files.type})
      
      const updatedUrl=URL.createObjectURL(updatedBlob)
      dispatch(updateSelectedImage({file,image:updatedUrl,idx:res.SelectCropImageIdx}))
      dispatch(OpenCloseEditor({ data: false, image: null }))
    }
    else{
      // dispatch(updateSelectedImage({image:res.Image_files[0].image,idx:res.SelectCropImageIdx}))
       dispatch(OpenCloseEditor({ data: false, image: null }))
    }
  }
  catch(err){
    console.log(err);
    
  }
}
   
  return (
    <div data-testid='edit-image-modal' className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-screen overflow-auto">
        <div className="p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Edit Image</h2>

            <button data-testid="close-btn"
              onClick={() => dispatch(OpenCloseEditor({ data: false, image: null }))}
              className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mb-4">

            <button data-testid="rotate-btn" onClick={()=>setRotation((prev)=>(prev+90)%360)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <FaArrowsRotate className="w-4 h-4" />
              Rotate
            </button>

            <button
            data-testid="crop-btn"
              onClick={() => setCropMode(!cropMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                cropMode ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <IoCrop className="w-4 h-4" />
              {cropMode ? 'Cropping...' : 'Crop'}
            </button>

            <button
              onClick={getUpdatedImage}
              className="cursor-pointer ml-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>

          {/* ⭐ ASPECT RATIO SELECTOR */}
          {cropMode && (
            <div className="flex flex-wrap gap-2 mb-4">
              {aspectOptions.map((opt,idx) => (
                <button
                data-testid="aspect-btn"
                  key={idx}
                  onClick={() => setAspect(opt.value)}
                  className={`px-3 py-1 rounded border ${
                    aspect === opt.value
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* IMAGE AREA */}
          <div className="border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center min-h-[400px]">
            <div className={`relative w-full h-screen max-h-[500px] bg-[#000] `}>

             
                  <Cropper
                   data-testid="cropper"
                    image={res.SelectedCropImage}
                    crop={!cropMode?{x:0,y:0}: crop}
                    zoom={zoom}
                    aspect={aspect} // ⭐ dynamic
                    onCropChange={cropMode?setCrop:()=>{}}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    objectFit='cover'
                    rotation={rotation}
                    onRotationChange={setRotation}
                   restrictPosition
                   initialCroppedAreaPixels={0}

                    style={{
                      cropAreaStyle:{
                        display:`${cropMode?"block":"none"}`,
                        height:"100%",
                        width:"100%",
                          border: "2px solid #fff",
                      },
                    
                    }}
                  />

                  {/* Zoom Slider */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.01}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-1/2 hidden"
                    />
                  </div>
              
            
            </div>
          </div>

          {/* Hint */}
          {cropMode && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              Drag to crop • Scroll to zoom • Choose an aspect ratio above
            </p>
          )}

        </div>
      </div>
    </div>
  )
}

export default EditImage
