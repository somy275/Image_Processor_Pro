
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import EditImage from './EditImage'
import { useSelector } from 'react-redux'
import Processing_Percentage from '../UI/Processing_Percentage'
import { useState } from 'react'
import { useEffect } from 'react'

const Applayout = () => {
  const{OpenEditor} =useSelector(state=>state.Upload)
    const {loading:convert}=useSelector(res=>res?.Convert)
    const {loading:watermark}=useSelector(res=>res?.WaterMark)
    const{loading:resize}=useSelector(res=>res?.Resize)
     const{loading:Pdf}=useSelector(res=>res?.Pdf);
     const{loading:Compress}=useSelector(res=>res?.Compress)
     const [loading, setLoading] = useState(false)
     

  useEffect(()=>{
    if(convert || watermark || resize || Pdf || Compress){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true)
    }
  },[convert,watermark,resize,Pdf,Compress])
 if(loading){
  return(
    <Processing_Percentage/>
  )
 }
  
  return (
     <main className="h-auto md:h-screen lg:h-auto px-4 md:px-10 bg-linear-to-br from-indigo-50 via-white to-purple-50">
    <Header/>
   <Outlet/>
   <Footer/>
   {
    OpenEditor &&   <EditImage/>
   }
     </main>
  )
}

export default  Applayout