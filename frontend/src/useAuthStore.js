import  { create } from  'zustand'; 

export const useAuthStore = create((set)=>({
    user : null,
    isLoading : true,

    checkAuth : async()=>{
        set({ isLoading : true});
        try{
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/check-auth`;
            const response = await fetch(apiUrl,{credentials: 'include'}) // importanat for cookies 
            const data = await response.json(); // converts data to json format 
             
            console.log(data);
            if(data.isAuthenticated)
            {
                set({
                    user : data.user,
                    isLoading : false
                })
            }
            else
            {
                set({
                    user : null,
                    isLoading : false
                })
            }
        }
        catch(error){
            console.error(error)
            set({user:null,isLoading: false })
        }
    },

    logout : async() =>{
         const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/logout`;
        await fetch(apiUrl,{method:'GET'})
        set({user : null })
         
    }
}))

