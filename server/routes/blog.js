import { Router } from "express";
import { Blog }  from "../modals/blog.js";

const blogRouter = Router();

blogRouter.post('/add-blog' ,async (req,res)=>{
     
     const { title , body } = req.body;
    try{
     const blog = await Blog.create({
            title : title,
            body : body,
            createdBy : req.user._id
        })
     res.status(201).json({message : "blog uploaded"})
    }
    catch(error){
        console.log("there was some error while uploading the blog")
        res.status(500).json({error: "there is an error on server side while uploading the blog"})
    }
})


// return all blogs 
blogRouter.get('/all' , async(req,res)=>{
    try{
    const  blogs = await Blog.find({}).sort({createdAt: -1});
    res.status(200).json(blogs)
    }
    catch(error)
    {
        console.log(error , "there was an error while getting blogs");
        res.status(500).json({error : "error while loading the blogs"})
    }
})

// a specific blog 
blogRouter.get('/:id' , async(req,res)=>{

    console.log('specific blog path hit ')
    try{
        const oneBlog = await Blog.findById(req.params.id);
        if(!oneBlog)
            return res.status(401).json({message : "blog not found"})
        return res.status(201).json(oneBlog)
    }catch(error)
    {
        console.error(error + " there was an error while getting blog by id")
        return res.status(500).json({error : 'error while fetching the blog by id'})
    }
})

export default blogRouter
