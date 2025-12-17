import React from 'react'
import Navbar from '@/components/Navbar'
import AllBlogs from '@/components/AllBlogs'

export default function Home(){
  return <div>
    <Navbar />
    
    <div className="min-h-screen w-full relative">
  {/* Radial Gradient Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
    }}
  />
     {/* Your Content/Components */}
     <div className=' relative z-10'>
     <AllBlogs/>
     </div>
</div>
  </div>

}