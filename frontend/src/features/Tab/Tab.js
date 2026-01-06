import { createSlice } from "@reduxjs/toolkit";

const TabSlice=createSlice({
    name:"Tab",
    initialState:{
        tab:"/api/v1/Convert/Progress",
        tab_status:"Convert"
    },
    reducers:{
onTabChange:(state,action)=>{
    switch(action.payload){
        case "/":
            state.tab="api/v1/Convert/Progress"
            state.tab_status="Convert"
            break;
        case "/Resize":
            state.tab="api/v1/Resize/Progress"
            state.tab_status="Resize"
            break;
        case "/Compress":
            state.tab="api/v1/Compress/Progress"
            state.tab_status="Compress"
            break;
        case "/Create%20PDF":
            state.tab="api/v1/Pdf/Progress"
            state.tab_status="Pdf"
            break;
        case "/Image%20Watermark":
            state.tab="api/v1/WaterMark/Progress";
            state.tab_status="WaterMark"
            break;
    }
}
    }
})
export const {onTabChange}=TabSlice.actions
export default TabSlice.reducer