import { Router } from "express";
import { User } from '../modals/user.js';
import { generateToken } from '../services/auth.js';

const userRouter = Router();

console.log("user called ")
userRouter.post('/signup' , async(req , res)=>{
    console.log("signup called")
    const { fullName , email , password } = req.body;
    try{
    const user = await User.create({
        name : fullName,
        email,
        password
    }) 
     const token = generateToken(user);

      return res.cookie('token',token).status(201).json(user);

    }
     catch (err) {
        // 3. Catch any errors
         console.error("Signup error:", err);
        return res.status(500).json({ error: err.message });
    }
})

userRouter.post('/signin' , async(req, res)=>{

    const { email , password } = req.body;

    try{
         const  token = await User.matchPasswordAndGenerateToken(email , password)
         const user = await User.findOne({ email }).select('-password -salt');
         return res
         .cookie('token',token)
         .status(200)
         .json({ message: "Login successful", user: user });
       }
    catch{
        return res.status(400).json({error : "Invalid Credentials"})
    } // this is a static method we created on user model to match password
})

// checks if the user is present after reffresh 
userRouter.get('/check-auth' , (req,res) => {
    // if middleware find token then the req will contain user 
    console.log("check auth hit")
    if(req.user){
        res.json({
            isAuthenticated : true,
             user : req.user  
            });
        }
        else
        {
            res.json({
                isAuthenticated : false,
                user : null
            })
        }
    }
)

// logout we clear the cookie 
userRouter.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({message : "Logged out successfully"})
})

export default userRouter;

