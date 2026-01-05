import {createBrowserRouter, RouterProvider} from "react-router"
import { Suspense } from "react"
import { lazy } from "react"
import Applayout from "./components/Applayout"
import Convert from "./pages/Convert"
const Pdf=lazy(()=> import("./pages/Pdf"))
const Compress=lazy(()=>import ("./pages/Compress"))
const Resize=lazy(()=>import ("./pages/Resize"))
const Image_Watermark=lazy(()=>import ("./components/Image_Watermark"))
const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Applayout/>,
      children:[
        {
          path:"/",
          element:<Convert/>,
        },
        {
          path:"/Resize",
          element:<Suspense fallback={<div className='relative h-[50vh] text-[#777F8B] flex items-center justify-center py-4 font-medium'>
                <div className='animate-spin   rounded-full h-9 w-9 border-b-2 border-[#4F39F6] mr-3'></div>
                <span className="font-medium text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(0.875rem,0.4816rem+0.6148vw,1.25rem)]">loading</span>
            </div>} ><Resize/></Suspense>
        },
        {
          path:"/Compress",
          element:<Suspense fallback={<div className='relative h-[50vh] text-[#777F8B] flex items-center justify-center py-4 font-medium'>
                <div className='animate-spin text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(0.875rem,0.4816rem+0.6148vw,1.25rem)]  rounded-full h-9 w-9 border-b-2 border-[#4F39F6] mr-3'></div>
                <span className="font-medium ">loading</span>
            </div>} ><Compress/></Suspense>
        },
        {
          path:"/Create PDF",
          element:<Suspense fallback={<div className='relative h-[50vh] text-[#777F8B] flex items-center justify-center py-4 font-medium'>
                <div className='animate-spin text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(0.875rem,0.4816rem+0.6148vw,1.25rem)]  rounded-full h-9 w-9 border-b-2 border-[#4F39F6] mr-3'></div>
                <span className="font-medium ">loading</span>
            </div>} ><Pdf/></Suspense>
        },
        {
          path:"/Image Watermark",
          element:<Suspense fallback={<div className='relative h-[50vh] text-[#777F8B] flex items-center justify-center py-4 font-medium'>
                <div className='animate-spin text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(0.875rem,0.4816rem+0.6148vw,1.25rem)]  rounded-full h-9 w-9 border-b-2 border-[#4F39F6] mr-3'></div>
                <span className="font-medium ">loading</span>
            </div>} ><Image_Watermark/></Suspense>
        },
      ]
    }
  ])
  return (
   <RouterProvider router={router}/>
  )
}

export default App