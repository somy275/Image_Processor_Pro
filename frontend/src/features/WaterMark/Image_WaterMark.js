//-----------------Hold WaterMark state------------------
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/ApiPath";
//-----------send the request to WaterMark route handler to WaterMark text--------------
export const WaterMarkTypeText=createAsyncThunk("watermark/text",async(data,thunkApi)=>{
try{
    
const res=await axiosInstance.post(API_PATH.WaterMark.WaterMarkTypeText,data,{responseType:"blob"});
return res.data;
}
catch(err){
     return thunkApi.rejectWithValue(err?.response.data.message)
}
})

//-------------helper: to send request to WaterMark route handler to WaterMark logo---------
export const WaterMarkTypeLogo=createAsyncThunk("watermark/logo",async(data,thunkApi)=>{
try{
const res=axiosInstance.post(API_PATH.WaterMark.WaterMarkTypeLogo,data,{responseType:"blob"})
return (await res).data;
}
catch(err){
      return thunkApi.rejectWithValue(err?.response.data.message)
}
})





//------------hold Watermark initial state----------------------
const ImageWaterMarkSlice=createSlice({
    name:"WaterMark",
    initialState:{
WaterMarkType:"text",
WaterMarkText:"",
WaterMarkTextSize:"Medium",
WaterMarkPosition:"Center",
WaterMarkOpacity:30,
WaterMarkScale:20,
WaterMarkLogo:[],
loading:false,
error:null,
Downloading:false
    },
//--------------------update WaterMark initial states when actions are triggered-----------/
    reducers:{
onWaterMarkType:(state,action)=>{
    state.WaterMarkType=action.payload
},
onWaterMarkText:(state,action)=>{
    state.WaterMarkText=action.payload
},
onWaterMarkSize:(state,action)=>{
    state.WaterMarkTextSize=action.payload
},
onWaterMarkPosition:(state,action)=>{
    state.WaterMarkPosition=action.payload
},
onWaterMarkOpacity:(state,action)=>{
    state.WaterMarkOpacity=action.payload
},
onWaterMarkScale:(state,action)=>
{
    state.WaterMarkScale=action.payload
},
onWaterMarkLogo:(state,action)=>{
    state.WaterMarkLogo[0]=action.payload
},
    },
    extraReducers:(builder)=>{
        builder
        .addCase(WaterMarkTypeText.pending,(state)=>{
            state.loading=true,
            state.error=null,
            state.Downloading=false
        })
        .addCase(WaterMarkTypeText.fulfilled,(state)=>{
            state.error=null,
            state.Downloading=true
        })
        .addCase(WaterMarkTypeText.rejected,(state,action)=>{
            state.loading=false,
            state.Downloading=false
            state.error=action.payload
        })
        .addCase(WaterMarkTypeLogo.pending,(state)=>{
            state.loading=true,
            state.error=null,
            state.Downloading=false
        })
        .addCase(WaterMarkTypeLogo.fulfilled,(state)=>{
            state.error=null,
            state.Downloading=true
        })
        .addCase(WaterMarkTypeLogo.rejected,(state,action)=>{
            state.loading=false,
            state.Downloading=false
            state.error=action.payload
        })

    }
})

export const {onWaterMarkType,onWaterMarkText,onWaterMarkSize,onWaterMarkPosition,onWaterMarkOpacity,onWaterMarkScale,onWaterMarkLogo}=ImageWaterMarkSlice.actions
export default ImageWaterMarkSlice.reducer