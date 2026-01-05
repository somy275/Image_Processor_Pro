import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/ApiPath";

//-------------------send request to server for compression--------------- 
export const CompressSingleImg=createAsyncThunk("compress/single",async(data,thunkApi)=>{
try{
const res=await axiosInstance.post(API_PATH.CompressImg.SingleImg,data,{responseType:"blob"})
return res.data;
}
catch(err){
    return thunkApi.rejectWithValue(err?.response.data.message)
}
})

export const CompressMultipleImg=createAsyncThunk("compress/multiple",async(data,thunkApi)=>{
try{
const res=await axiosInstance.post(API_PATH.CompressImg.MultipleImg,data,{responseType:"blob"})
return res.data;
}
catch(err){
    return thunkApi.rejectWithValue(err?.response.data.message)
}
})

//-----------hold compress states and reducers-----------------------
const CompressSlice=createSlice({
name:"Compress",
initialState:{
    quality:80,
     loading:false,
error:null,
Downloading:false
},
reducers:{
    onQualityChange:(state,action)=>{
        state.quality=action.payload
    }
},
extraReducers:(builder)=>{
    builder
    .addCase(CompressSingleImg.pending,(state)=>{
                state.loading=true,
                state.error=null,
                state.Downloading=false
            })
            .addCase(CompressSingleImg.fulfilled,(state)=>{
                state.error=null,
                state.Downloading=true
            })
            .addCase(CompressSingleImg.rejected,(state,action)=>{
                state.loading=false,
                state.Downloading=false
                state.error=action.payload
            })
            .addCase(CompressMultipleImg.pending,(state)=>{
                        state.loading=true,
                        state.error=null,
                        state.Downloading=false
                    })
            .addCase(CompressMultipleImg.fulfilled,(state)=>{
                        state.error=null,
                        state.Downloading=true
                    })
            .addCase(CompressMultipleImg.rejected,(state,action)=>{
                        state.loading=false,
                        state.Downloading=false
                        state.error=action.payload
                    })
}
})

export const {onQualityChange}=CompressSlice.actions
export default CompressSlice.reducer