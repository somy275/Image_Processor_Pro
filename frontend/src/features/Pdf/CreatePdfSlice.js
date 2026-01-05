import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/ApiPath";

export const Create_Pdf=createAsyncThunk("pdf/image",async(data,thunkApi)=>{
try{
const res=await axiosInstance.post(API_PATH.Create_Pdf.pdf,data,{responseType:"blob"});
return res.data
}
catch(err){
     
     return thunkApi.rejectWithValue(err?.response.data.message)
}
})

const PdfSettingSlice=createSlice({
     name:"Pdf",
     initialState:{
PageSize:"A4",
orientation:"portrait",
margin:"none",
pageNumbers:"none",
fit_type:"contain",
loading:false,
error:null,
Downloading:false
     },
     reducers:{
onPageSizeChange:(state,action)=>{  // change page size
state.PageSize=action.payload
},
onPageOrientation:(state,action)=>{ // select orientation
state.orientation=action.payload   
},
onPageMargin:(state,action)=>{ // select margin
     state.margin=action.payload
},

onPageScale:(state,action)=>{
     state.fit_type=action.payload
},

onPageNo:(state,action)=>{
     
     state.pageNumbers=action.payload
}
},
extraReducers:(builder)=>{
     builder
     .addCase(Create_Pdf.pending,(state)=>{
               state.loading=true,
               state.error=null,
               state.Downloading=false
          })
          .addCase(Create_Pdf.fulfilled,(state)=>{
               state.error=null,
               state.Downloading=true
          })
          .addCase(Create_Pdf.rejected,(state,action)=>{
               state.loading=false,
               state.Downloading=false
               state.error=action.payload
          })
}
})

export const {onPageSizeChange,onPageOrientation,onPageMargin,onPageScale,onPageNo}=PdfSettingSlice.actions;
export default PdfSettingSlice.reducer;

