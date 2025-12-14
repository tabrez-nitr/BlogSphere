import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import { checkForAuthCookie } from './middlewares/auth.js';




const app = express();
const PORT = 8000;

//middleware converts to json file 
app.use(express.json());
//to convert file type 
app.use(express.urlencoded({extended: true}));

// for cross origin requests 
app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}))



mongoose.connect('mongodb://127.0.0.1:27017/blogSphere')
.then(()=> console.log("Connected to MongoDB"))
.catch((err)=> console.log(err));







app.use(cookieParser());// checks if cookie is present 
app.use(checkForAuthCookie('token')); // check if cokkie is present with this name 
// we have kept the name of the cookie name as token 



//if any route hits this than useRouter handels the rest of the request
app.use('/user' , userRouter);

// server working on port 
app.listen(PORT , ()=> {
    console.log("Server is running on port "+ PORT);
})

