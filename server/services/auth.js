import jwt from "jsonwebtoken";

const secret = "$superMan"

function generateToken(user){
   const payload = {
       id : user.id,
       email : user.email,
       profileImage : user.profileImage,
       role : user.role
   }

   const token =  jwt.sign(payload,secret)
   return token;
}


function validateToken(token){
    const payload = jwt.verify(token,secret)
    return payload;
}

export {generateToken , validateToken}