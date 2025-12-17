
import mongoose from "mongoose";
import { Schema , model } from "mongoose";


const blogSchema = new Schema({
    title : {
        type : String,
        required: true,
    },
    body : {
        type : String,
        required : true,
    },
    coverImageUrl : {
        type : String,
        required : false
    },
    createdBy : {
        type : Schema.Types.ObjectId, // store the id (address) of another document 
        ref : "user",
    }

},
{timestamps : true});

export const Blog = model('blog', blogSchema);
 
