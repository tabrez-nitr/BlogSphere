import { createHmac ,randomBytes } from "crypto";
import mongoose from "mongoose";
import { generateToken } from "../services/auth.js";

const userScehma = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
         type : String, 
         required : true,
         unique : true
    },
    // salt and paper hash for better security of password 
    salt : {
         type : String,
    },
    password : {
        type : String, 
        required : true,
    },
    profileImage : {
        type : String,
        default : "./public/profile.webp"
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    }
},{timestamps : true})


// hash the password and save 
userScehma.pre('save' , function(next){
    const user = this;
    if(!user.isModified('password'))
        return ;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256' , salt).update(user.password).digest('hex');


    this.salt = salt;  // store salt to compare password later 
    this.password = hashedPassword;

    next();
})



// our function on model  to match password when we call 
userScehma.static('matchPasswordAndGenerateToken' ,async function(email, password){
    const user = await this.findOne({email});  // this refers to the model here
    if(!user)
        throw new Error("User not Found");
    const salt = user.salt;
    const hashedPassword =  user.password;

    // we will hash the the password the user sent us and match if the hsashed value is same as the stored hashed password
    const userProvidedHashed = createHmac('sha256', salt).update(password).digest('hex');
     
    if (userProvidedHashed !== hashedPassword)
        throw new Error("Password doesn't match");

         // we return token 
         const token = generateToken(user);
         console.log(token);
         return (token);
        
        // return { ...user , password : undefined , salt : undefined }
})


export const User = mongoose.model("user" , userScehma);