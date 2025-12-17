'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';

function AllBlogs() {

   const [blogs, setBlogs] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
       const fetchBlogs = async () => {
            try {
                
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog/all`;
                
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                const result = await response.json();
                
                if (response.ok) {
                    setBlogs(result);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
       }
       fetchBlogs();
   }, [])
    
   if (loading) return <div className="text-center mt-40">Loading...</div>;

  return (
    <div className='flex flex-col items-center mt-20 min-h-screen px-4'>
       <h1 className='text-5xl font-bold mb-10'>Here are your blogs</h1>
       
       <div className="grid gap-6 w-full max-w-4xl">
         {blogs.length > 0 ? (
           blogs.map((blog) => (
             <div key={blog._id} className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition">
               <Link href={`/blog/${blog._id}`}>
                 <h2 className="text-2xl font-bold mb-2 text-blue-600 hover:underline cursor-pointer">
                    {blog.title}
                 </h2>
               </Link>

                {/* preview of the body  */}
               <p className="text-gray-600 truncate">{blog.body}</p>
               
               <Link href={`/blog/${blog._id}`} className="text-sm text-blue-500 mt-4 inline-block">
                 Read full article →
               </Link>
             </div>
           ))
         ) : (
           <p className="text-center text-gray-500">No blogs found.</p>
         )}
       </div>
    </div>
  )
}

export default AllBlogs