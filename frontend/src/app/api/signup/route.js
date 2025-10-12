import { NextResponse } from "next/server";

export async function POST(request){
    try{
       const data = await request.json(); // convert client request to json 
       
    }
    catch(error){
        console.log(error);
    }
}