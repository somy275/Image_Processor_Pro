//------------this file contains all api's path-------------------

export const Base_URL="https://image-processor-101e.onrender.com/" // the base url of the backend
export const API_PATH={  // api path
    ConvertImg:{
        SingleImg:"/api/v1/Convert/ConvertSingleImg",
        MultipleImg:"/api/v1/Convert/ConvertMultipleImg",
        Progress:"/api/v1/Convert/Progress"
    },
    ResizeImg:{
        SingleImg:"/api/v1/Resize/ResizeSingleImg",
         MutlipleImg:"/api/v1/Resize/ResizeMultipleImg"
    },
    Create_Pdf:{
        pdf:"/api/v1/Pdf/CreatePdf"
    },
    WaterMark:{
        WaterMarkTypeText:"/api/v1/WaterMark/WaterMarkTypeText",
        WaterMarkTypeLogo:"/api/v1/WaterMark/WaterMarkTypeLogo",
         Progress:"/api/v1/WaterMark/Progress"
    },
    CompressImg:{
SingleImg:"/api/v1/Compress/CompressSingleImg",
MultipleImg:"/api/v1/Compress/CompressMultipleImg"
    }
}