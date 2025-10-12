import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';




const app = express();
const PORT = 8000;


mongoose.connect('mongodb://127.0.0.1:27017/blogSphere')
.then(()=> console.log("Connected to MongoDB"))
.catch((err)=> console.log(err));

app.set('view engine' , 'ejs');
app.set('views', path.resolve('/views') );


app.use(cors({
    origin : 'http://localhost:3000'
}))


app.listen(PORT , ()=> {
    console.log("Server is running on port "+ PORT);
})


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user' , userRouter);

