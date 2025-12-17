'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/useAuthStore";

function SignIn() {
  const router = useRouter();
  const { checkAuth  }  = useAuthStore();
  const [ loginError , setLoginError ] = useState(false);
  const [ formData , setFormData ] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  //transfering data to backend 
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoginError(false);
     
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/signin`;
    try{
        const response = await fetch(apiUrl , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(formData),
            credentials : 'include'
        })

        
       const result = await response.json(); // contents json file 
       if(response.ok){
         await checkAuth();

         router.push('/');
         return
       }
       if(!response.ok){
        throw new Error(result.message || 'something went wrong');
       }
         console.log('Signin successful:', result);
         router.push('/');

    }
    catch(error){
        console.log(error);
        setLoginError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign In</h2>

        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-center text-red-700 rounded-lg text-sm">
            Invalid Credentials
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{' '}
          <a href="/signUp" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;