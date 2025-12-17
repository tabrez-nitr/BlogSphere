'use client' 
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function CreateBlogPage() {
 
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  // 2. LOGIC: This function runs when the button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevents the page from refreshing
    setLoading(true)

    const blogData = { title, body }
   

    
    console.log("Submitting Blog Data:", blogData)
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog/add-blog`;
    try{
            const response = await fetch(apiUrl , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(blogData),
            credentials : 'include'
       }) 
        const result = await response.json();
         
        if(response.ok)
        {
           router.push('/');
           setLoading(false);
        }

    }

    catch(error)
    {
      console.log("there was error while uploading the blog ", error);
      setLoading(false)
    }
    
     
  }

  // 3. UI: The actual HTML/JSX the user sees
  return (
    <div className="min-h-screen p-8 bg-gray-50 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md border border-gray-200">
        
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="Enter an engaging title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Body Field */}
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="body"
              required
              rows="6"
              placeholder="Write your thoughts here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
          
        </form>
      </div>
    </div>
  )
}

export default CreateBlogPage