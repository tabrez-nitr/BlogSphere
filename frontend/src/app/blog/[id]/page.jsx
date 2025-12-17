'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Hook to get the ID from URL


function BlogDetails() {
 
    const {id} = useParams(); // identifies the id 
    const [blog , setBlog] = useState(null);
    const [loading , setLoading] = useState(true);
    

    useEffect(()=>{
        const fecthSingleBlog = async() =>{
            try{
              const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`;
              const response = await fetch(apiUrl,{
                method : 'GET',
                credentials : 'include',
              });

              const data = await response.json();
              if(response.ok){
                setBlog(data);
              }
            }
            catch(error)
            {
                console.error(error+" ")
            }
            finally
            {
              setLoading(false)
            }
        }
        if(id){
            fecthSingleBlog();
        }
    },[id])


    if (loading) return <div className="text-center mt-20">Loading...</div>;
    if (!blog) return <div className="text-center mt-20">Blog not found</div>;

    return (
        <div className="max-w-3xl mx-auto p-8 mt-10">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{blog.title}</h1>
            <p className="text-gray-500 text-sm mb-8">
                Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <div className="prose lg:prose-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                {blog.body}
            </div>
        </div>
    );
  }

export default BlogDetails
