import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/ApiPath";

// send request to server for resize single image
export const ResizeSingleImg=createAsyncThunk("resize_single/image",async(data,thunkApi)=>{
  try{
const res=await axiosInstance.post(API_PATH.ResizeImg.SingleImg,data,{responseType:"blob"})
return res.data;
  }
  catch(err){
    return thunkApi.rejectWithValue(err?.response.data.message)
  }
})

// send request to server for resize multiple iamges
export const ResizeMultipleImg=createAsyncThunk("resize_multiple/image",async(data,thunkApi)=>{
  try{
const res=await axiosInstance.post(API_PATH.ResizeImg.MutlipleImg,data,{responseType:"blob"})
return res.data;
  }
  catch(err){
     return thunkApi.rejectWithValue(err?.response.data.message)
  }
})

const ImageResizeSlice= createSlice({
  name:"Resize",
initialState:{
  ResizeScale:100,
  ResizeHeight:"",
  ResizeWidth:"",
  AspectRatio:false,
  loading:false,
error:null,
Downloading:false
},
reducers:{
onResizeScale:(state,action)=>{
state.ResizeScale=action.payload;
},
onResizeHeight:(state,action)=>{
state.ResizeHeight=action.payload;
},
onResizeWidth:(state,action)=>{
state.ResizeWidth=action.payload;
},
onResizeScaleIncrease:(state)=>{
state.ResizeScale+=1;
},
onResizeScaleDecrease:(state)=>{
state.ResizeScale-=1;
},
onAspectRatio:(state,action)=>{
  state.AspectRatio=action.payload
}
},
extraReducers:(builder)=>{
  builder
  .addCase(ResizeSingleImg.pending,(state)=>{
            state.loading=true,
            state.error=null,
            state.Downloading=false
        })
        .addCase(ResizeSingleImg.fulfilled,(state)=>{
            state.error=null,
            state.Downloading=true
        })
        .addCase(ResizeSingleImg.rejected,(state,action)=>{
            state.loading=false,
            state.Downloading=false
            state.error=action.payload
        })
        .addCase(ResizeMultipleImg.pending,(state)=>{
                    state.loading=true,
                    state.error=null,
                    state.Downloading=false
                })
        .addCase(ResizeMultipleImg.fulfilled,(state)=>{
                    state.error=null,
                    state.Downloading=true
                })
        .addCase(ResizeMultipleImg.rejected,(state,action)=>{
                    state.loading=false,
                    state.Downloading=false
                    state.error=action.payload
                })
}
})
export const {onResizeScale,onResizeHeight,onResizeWidth,onResizeScaleIncrease,onResizeScaleDecrease,onAspectRatio}=ImageResizeSlice.actions
export default ImageResizeSlice.reducer