import {createSlice} from "@reduxjs/toolkit"
const ImgUploadSlice=createSlice({
    name:"Upload",
    initialState:{
        Image_files:[],
        OpenEditor:false,
        SelectedCropImage:null,
        SelectCropImageIdx:0,
        ImgFormat:"png",
        quality:90
    },
    reducers:{
upload:(state,action)=>{state.Image_files.push(action.payload)},
remove:(state,action)=>{state.Image_files.splice(action.payload,1)},
removeAll:(state)=>{state.Image_files=[]},
OpenCloseEditor:(state,action)=>{state.OpenEditor=action.payload.data, state.SelectedCropImage=action.payload.image, state.SelectCropImageIdx=action.payload.index},

updateSelectedImage:(state,action)=>{
 state.Image_files.splice(action.payload.idx,1,action.payload.file),state.Image_files[action.payload.idx].image=action.payload.image},
 
 SelectedImgFormat:(state,action)=>{
     state.ImgFormat=action.payload.format; 
    },
SelectQuality:(state,action)=>{state.quality=action.payload}
}
})
export const {upload,remove,removeAll,OpenCloseEditor,updateSelectedImage, SelectedImgFormat, SelectQuality}=ImgUploadSlice.actions
export default ImgUploadSlice.reducer