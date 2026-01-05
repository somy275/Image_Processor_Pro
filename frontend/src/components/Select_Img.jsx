import React, { useReducer, useRef } from 'react'
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../features/Image_Upload/ImageUploadSlice';
const initialState={isDragging:false,imageFile:[]};
function reducer(state,action){
switch(action.type){
    case 'Dragging':
        return{
            ...state,isDragging:action.payload
        }
    case 'fileSelect':
    return{
...state,imageFile:action.payload
    }
}
}
const DragAndDrop = () => {
   const Uploadedfiles= useSelector((state)=>state.Upload.Image_files)
   const Dispatch=useDispatch()
    const fileInputRef= useRef()
    const[state,dispatch]=useReducer(reducer,initialState)
    
    const handleFileSelect=(e,source="Click")=>{
    let file=source==="Click"?e.target.files[0]:e.dataTransfer.files[0];
    if(!file) return
        let formats=["jpeg","png","webp","jpg"];
        let imageType=formats.includes(file.type?.split("/")[1])
        if(imageType && file.type.startsWith("image/")){
          const reader=new FileReader();
          reader.onload=(e)=>{
            dispatch({type:"fileSelect",payload:file,image:e.target.result})
            // console.log(Modifiedfile)
            Dispatch(upload({file,image:e.target.result}))
          }
          reader.readAsDataURL(file)
        }
    
        
    }
    const handleFileDrag=(e)=>{
        e.preventDefault()
        dispatch({type:'Dragging',payload:true})
handleFileSelect(e)
    }
    const handleFileDragLeave=(e)=>{
        e.preventDefault()
        dispatch({type:'Dragging',payload:false})
    }
    const handleDrop=(e)=>{
        e.preventDefault();
        dispatch({type:'Dragging',payload:false})
        handleFileSelect(e,"Drop")
    }
    
  return (
<div onDragOver={handleFileDrag} onDragLeave={handleFileDragLeave} onDrop={handleDrop} onClick={()=>fileInputRef.current?.click()} className={`border-2 border-dashed ${state.isDragging?"border-indigo-500 bg-indigo-50 scale-105":"border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-gray-100 hover:-translate-y-1"}  rounded-lg p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all`}>
<FiUpload className='w-16 h-16 text-indigo-400 mx-auto mb-4'/>
<p className="text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(1.0625rem,0.6691rem+0.6148vw,1.4375rem)] font-semibold text-gray-700 mb-2">
              Drop images here or click to upload
            </p>
            <p className="text-[clamp(0.6875rem,0.4875rem+1.6vw,0.9375rem)] min-[450px]:text-[clamp(0.8125rem,0.5185rem+1.0453vw,1.1875rem)] lg:text-[clamp(0.8125rem,0.4191rem+0.6148vw,1.1875rem)] text-gray-500">
              Supports JPG, PNG, WEBP, AVIF
            </p>
             <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
</div>
  )
}

export default DragAndDrop