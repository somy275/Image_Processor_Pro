import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/ApiPath";

// sending single image to server for conversion to differnt format
export const ConvertSingleImg=createAsyncThunk("ConvertSingle/img",async(data,thunkApi)=>{
    try{
const res=await axiosInstance.post(API_PATH.ConvertImg.SingleImg,data,   { responseType: "blob" });
   return res.data;
    }
    catch(err){
        return thunkApi.rejectWithValue(err?.response.data.message)
    }
})

export const ConvertMultipleImg=createAsyncThunk("ConvertMultiple/img",async(data,thunkApi)=>{
    try{
const res=await axiosInstance.post(API_PATH.ConvertImg.MultipleImg,data,   { responseType: "blob" });
   return res.data;
    }
    catch(err){
        return thunkApi.rejectWithValue(err?.response.data.message)
    }
})



const ConvertImgSlice=createSlice({
    name:"Converted_Images",
    initialState:{
        Downloading:false,
        loading:false,
        error:null
    },
    reducers:{
back:(state)=>{state.loading=false}
    },
    extraReducers:(builder)=>{
builder
.addCase(ConvertSingleImg.pending,(state)=>{
    state.loading=true,
    state.error=null,
    state.Downloading=false
})
.addCase(ConvertSingleImg.fulfilled,(state)=>{
    state.Downloading=true
    state.error=null
})
.addCase(ConvertSingleImg.rejected,(state,action)=>{
    state.loading=false,
    state.error=action.payload,
    state.Downloading=false
})

.addCase(ConvertMultipleImg.pending,(state)=>{
    state.loading=true,
    state.error=null,
    state.Downloading=false
})
.addCase(ConvertMultipleImg.fulfilled,(state)=>{
    state.Downloading=true
    state.error=null
})
.addCase(ConvertMultipleImg.rejected,(state,action)=>{
    state.loading=false,
    state.error=action.payload,
    state.Downloading=false
})
    }
})
export const {back}=ConvertImgSlice.actions
export default ConvertImgSlice.reducer