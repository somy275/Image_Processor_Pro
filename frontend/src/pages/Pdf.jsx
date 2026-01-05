import React from 'react'
import DragAndDrop from '../components/Select_Img'
import Preview_Img from '../components/Preview_Img'
import Pdf_Setting from '../components/Pdf_Setting'

const Pdf = () => {
  return (
     <section className=' mx-auto max-w-full lg:max-w-[78%]'>
     <div className='bg-white rounded-xl shadow-lg px-6 py-8 md:p-10 mb-6'>
<DragAndDrop/>
<Pdf_Setting/>
</div>
  <Preview_Img tab={"Pdf"}/>
</section>
  )
}

export default Pdf