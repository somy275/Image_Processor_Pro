//----------------------------Centralized store that holds entire component's state-------------------------//
import {configureStore} from "@reduxjs/toolkit"
import ImageUploadSlice from "../features/Image_Upload/ImageUploadSlice"
import ConvertImageSlice from "../features/Image_Upload/ConvertImageSlice"
import ImageResizeSlice from "../features/Image_Resize/ResizeImageSlice"
import PdfSettingSlice from "../features/Pdf/CreatePdfSlice"
import ImageWaterMarkSlice from "../features/WaterMark/Image_WaterMark"
import TabSlice from "../features/Tab/Tab"
import CompressSlice from "../features/Compress/CompressSlice"
export const store=configureStore({
    reducer:{
Upload:ImageUploadSlice,
Convert:ConvertImageSlice,
Resize:ImageResizeSlice,
Pdf:PdfSettingSlice,
WaterMark:ImageWaterMarkSlice,
Tab:TabSlice,
Compress:CompressSlice

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
})