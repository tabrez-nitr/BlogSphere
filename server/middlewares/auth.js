// checks token and validates it 
//generic function
import { validateToken } from "../services/auth.js";


function checkForAuthCookie(cookieName){
    return(req,res,next)=>{
          const tokenValue = req.cookies[cookieName] // we will check if it is present in the browser 
          // if no token means there is no user 

          if(!tokenValue){
             return next();
          }
         
          try{
          const userPayload = validateToken(tokenValue);
          req.user = userPayload;
          return  next();
          }
          catch{
           return next();
          }
    }
}

export {checkForAuthCookie}
