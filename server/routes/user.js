import { Router } from "express";
import { User } from '../modals/user.js';

const userRouter = Router();

userRouter.post('/signup' , async(req , res)=>{
    const { fullName , email , password } = req.body;
    await User.create({
        name : fullName,
        email,
        password
    })
    .then((user)=> res.status(201).json(user))
    .catch((err)=> res.status(500).json({error : err.message}))
})

userRouter.post('/signin' , async(req, res)=>{

    const { email , password } = req.body;

    const  isMatched = await User.matchPassword(email , password) // this is a static method we created on user model to match password
    if(!isMatched)
        return res.status(400).json({error : "Invalid Credentials"});

    return res.status(200).json(isMatched); // isMatched contains user details except password and salt
    console.log(isMatched);

})

export default userRouter;

